#!/usr/bin/env python3
"""Полицейская сирена: синтез электронной сирены → assets/sounds/siren_loops.js.

Две бесшовные петли: протяжный вой (wail, 4,6 с) и быстрый «yelp» (6 × 0,31 с).
Волна — почти квадратная (нечётные гармоники) с мягким ограничением, как у
электронных сирен; два «динамика» чуть расстроены. Синтез с 4-кратным запасом
по частоте (без наложения гармоник), дальше ffmpeg: пересэмплирование, «рупор»
(полоса 450–5200 Гц, подъём 0,9 и 1,9 кГц), короткое эхо улицы.

Запуск: python3 tools/siren.py  (нужны numpy и ffmpeg)
"""
import base64
import os
import subprocess
import tempfile
import wave

import numpy as np

SR = 176400  # синтез с запасом; ffmpeg потом сведёт к 44100
OUT_SR = 44100
LO, HI = 640.0, 1560.0
ROOT = os.path.join(os.path.dirname(__file__), '..')


def wail_freq(t, period=4.6, rise=2.9):
    ph = t % period
    r = ph / rise
    f_up = LO + (HI - LO) * (1 - np.exp(-3.2 * r)) / (1 - np.exp(-3.2))
    d = np.clip((ph - rise) / (period - rise), 0, 1)
    f_dn = LO + (HI - LO) * np.exp(-2.6 * d) * (1 - d) ** 0.3
    return np.where(ph < rise, f_up, f_dn)


def yelp_freq(t, period=0.31):
    ph = (t % period) / period
    up = np.clip(ph / 0.55, 0, 1)
    dn = np.clip((ph - 0.55) / 0.45, 0, 1)
    return np.where(ph < 0.55, LO + (HI - LO) * up ** 0.7, HI - (HI - LO) * dn ** 1.3)


def tone(freq, detune=1.0):
    phase = 2 * np.pi * np.cumsum(freq * detune) / SR
    f = freq * detune
    x = np.zeros_like(phase)
    for n in range(1, 20, 2):
        x += np.sin(n * phase) / n ** 1.15 * np.clip((15000 - n * f) / 3000, 0, 1)
    return np.tanh(1.6 * x)


def loop(kind, dur):
    t = np.arange(int(round(dur * SR))) / SR
    f = wail_freq(t) if kind == 'wail' else yelp_freq(t, period=dur / 6)
    total = np.sum(f) / SR
    f = f * (round(total) / total)  # целое число периодов — стык петли без щелчка
    n1 = round(total)
    det = round(n1 * 1.004) / n1    # второй динамик — тоже целое число периодов
    return tone(f) * 0.55 + tone(f, det) * 0.45


def write_wav(path, a, sr):
    a = a / np.max(np.abs(a)) * 0.8
    with wave.open(path, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
        w.writeframes((a * 32767).astype('<i2').tobytes())


def main():
    tmp = tempfile.mkdtemp()
    urls = {}
    for kind, dur in (('wail', 4.6), ('yelp', 0.31 * 6)):
        # три копии подряд: эхо из прошлой петли ложится на следующую, берём среднюю
        raw, fx, mid, ogg = (os.path.join(tmp, f'{kind}_{s}') for s in ('raw.wav', 'fx.wav', 'mid.wav', 'loop.ogg'))
        write_wav(raw, np.tile(loop(kind, dur), 3), SR)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af',
                        'aresample=44100:resampler=soxr,highpass=f=450,lowpass=f=5200,'
                        'equalizer=f=1900:t=q:w=1.2:g=4,equalizer=f=900:t=q:w=1:g=2,'
                        'aecho=0.85:0.45:35|85:0.22|0.12,volume=0.8', fx], check=True)
        with wave.open(fx) as w:
            a = np.frombuffer(w.readframes(w.getnframes()), '<i2')
        n = round(dur * SR) * OUT_SR // SR
        with wave.open(mid, 'wb') as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(OUT_SR)
            w.writeframes(a[n:2 * n].tobytes())
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', mid, '-c:a', 'libvorbis', '-q:a', '4', ogg], check=True)
        urls[kind] = 'data:audio/ogg;base64,' + base64.b64encode(open(ogg, 'rb').read()).decode()
    with open(os.path.join(ROOT, 'assets/sounds/siren_loops.js'), 'w') as f:
        f.write('// Полицейская сирена — синтез электронной сирены (своя работа проекта, tools/siren.py):\n'
                '// протяжный вой (wail, 4,6 с) и быстрый «yelp» (1,9 с), бесшовные петли.\n'
                '// Как data-URL в скрипте — чтобы работало при запуске с диска (file://).\n'
                f"window.SIREN_WAIL = '{urls['wail']}';\n"
                f"window.SIREN_YELP = '{urls['yelp']}';\n")
    print('assets/sounds/siren_loops.js готов')


if __name__ == '__main__':
    main()
