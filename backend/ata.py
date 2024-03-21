from audiocraft.models.musicgen import MusicGen
from application.main_model import save_audio

model=MusicGen.get_pretrained("facebook/musicgen-melody")
model.set_generation_params(duration=10)
# unconditional_wav= model.generate_unconditional(num_samples=2)
# conditional_wav=model.generate(descriptions=["flute traditional music","guitar rock electric"])
from audiocraft.data.audio import audio_write , audio_read
import os
# for idx,wav_file in enumerate(unconditional_wav):
#     audio_write(f"unconditional_{idx}",wav_file.cpu(),sample_rate=model.sample_rate)
# for idx,wav_file in enumerate(conditional_wav):
#     audio_write(f"conditional{idx}",wav_file.cpu(),sample_rate=model.sample_rate)
from IPython.display import display, Audio
# for i in os.listdir():
#     if i.endswith(".wav"):
#         print(i)
#         display(Audio(i))
base_audio,sr=audio_read('backend/uploaded_audio/hbd.wav')
print(base_audio.shape)
print(sr)
duration = 10
base_audio=base_audio[:,:sr*duration]
print(base_audio.shape)
print(type(base_audio))
# continuation_wav=model.generate_continuation(prompt=base_audio,prompt_sample_rate=sr,descriptions=["sharp flute"])
# audio_write(f"continuation_0",continuation_wav[0].cpu(),sample_rate=model.sample_rate)
# display(Audio("continuation_0.wav"))
melody_version=model.generate_with_chroma(descriptions=[""],melody_wavs=base_audio,melody_sample_rate=sr,progress=True)
print('line28')
save_file = save_audio(melody_version)
# print(audio_write(f"melody_0",melody_version[0].cpu(),sample_rate=model.sample_rate))
print('line30')
# display(Audio("melody_0.wav"))
print('line32')