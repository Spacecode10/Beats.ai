from flask import current_app as app
from flask import jsonify, Flask, request
from .main_model import *
from flask import send_file
from audiocraft.models.musicgen import MusicGen
from application.main_model import save_audio
import os
from audiocraft.data.audio import audio_write , audio_read
from IPython.display import display, Audio
import random



@app.route("/")
def index():
    return jsonify(message="ha done bhai")

@app.route("/api/prompt", methods=["GET", "POST"])
def text_generate():
    # flag = False
    data = request.json
    print(data)
    prompt = data['prompt']
    duration = 10
    duration = data['duration']
    print("************DURATION************* : ",duration)
    print(type(duration))
    duration = int(duration)
    print('............................')
    # print('happy birthday' in prompt)
    # if 'happy birthday' in prompt or 'birthday' in prompt or 'jingle bell' in prompt or 'christmas' in prompt or 'merry christmas' in prompt:
    #     flag = True


    # if flag:
    #     if prompt=='happy birthday':
    #         i = random.randint(1, 4)
    #         audio_path = f'C:/Users/shahy/OneDrive/Desktop/Last Done/Temp-Beats.AI/backend/hbd/hbd{i}.wav'
    #         print(prompt)
    #         return send_file(audio_path, mimetype='audio/wav')
        
    #     elif prompt=='merry christmas' or prompt=='christmas':
    #         i = random.randint(1, 2)
    #         audio_path = f'C:/Users/shahy/OneDrive/Desktop/Last Done/Temp-Beats.AI/backend/merry_christmas/merry{i}.wav'
    #         print(prompt)
    #         return send_file(audio_path, mimetype='audio/wav')
        
    #     elif prompt=='jingle bells' or prompt=='jingle':
    #         i = random.randint(1, 2)
    #         audio_path = f'C:/Users/shahy/OneDrive/Desktop/Last Done/Temp-Beats.AI/backend/jingle_bells/jingle_bells{i}.wav'
    #         print(prompt)
    #         return send_file(audio_path, mimetype='audio/wav')

    #     elif 'happy birthday' in prompt or 'birthday' in prompt:
    #         print('*************HAPPY BIRTHDAY********')
    #         i = random.randint(1,4)
            
    #         base_audio,sr=audio_read(f'C:/Users/shahy/OneDrive/Desktop/Last Done/Temp-Beats.AI/backend/hbd/hbd{i}.wav')
    #         # audio_file = 'C:/Users/shahy/OneDrive/Desktop/Last Done/Temp-Beats.AI/backend/hbd/hbd1.wav'
        
    #     elif 'jingle bell' in prompt:
    #         print('*************JINGLE BELLS********')
    #         i=random.randint(1, 2)
    #         base_audio,sr=audio_read(f'C:/Users/shahy/OneDrive/Desktop/Last Done/Temp-Beats.AI/backend/jingle_bells/jingle_bells{i}.wav')

    #     elif 'christmas' in prompt or 'merry christmas' in prompt:
    #         print('*************MERRY CHRISTMAS********')
    #         i=random.randint(1, 2)
    #         base_audio,sr=audio_read(f'C:/Users/shahy/OneDrive/Desktop/Last Done/Temp-Beats.AI/backend/merry_christmas/merry{i}.wav')
    
    # text_input = prompt
    # audio_file.save('uploaded_audio/'+audio_file.filename)
    # x = duration
    # model=MusicGen.get_pretrained("facebook/musicgen-melody")
    # model.set_generation_params(duration=x)

    # print(base_audio.shape)
    # print(sr)

    
    # base_audio=base_audio[:,:sr*duration]
    # print(base_audio.shape)
    # print(type(base_audio))
    # l=[]
    # l.append(text_input)
    # melody_version=model.generate_with_chroma(descriptions=l,melody_wavs=base_audio,melody_sample_rate=sr,progress=True)
    # save_file = save_audio(melody_version)


    # audio_path = 'audio_output/audio_0.wav'
    # return send_file(audio_path, mimetype='audio/wav')








    music_tensors = generate_music_tensors(prompt, duration)
    print("Musci Tensors: ", music_tensors)
    save_music_file = save_audio(music_tensors)
    # audio_path = 'C:/Users/shahr/OneDrive/Desktop/React Flask/AI-Music-generator/backend/audio_output/audio_0.wav'  # Update this with your audio file path
    audio_path = 'audio_output/audio_0.wav'
    print(prompt)
    return send_file(audio_path, mimetype='audio/wav')
    # capitalized_text = prompt.upper()
    # return jsonify({'capitalizedText': capitalized_text})
    



#**************GENRE-TO-MUSIC*******************************
@app.route("/api/genre", methods=['GET', 'POST'])
def genre_generate():
    data = request.json
    print(data['genres'])
    genre_array = data['genres']
    prompt = 'generate a music having genres : ' + ', '.join(genre_array)
    # duration = 10
    duration = data['duration']
    print("************DURATION************* : ",duration)
    duration = int(duration)
    print(type(duration))
    music_tensors = generate_music_tensors(prompt, duration)
    print("Musci Tensors: ", music_tensors)
    save_music_file = save_audio(music_tensors)
    # audio_path = 'C:/Users/shahr/OneDrive/Desktop/React Flask/AI-Music-generator/backend/audio_output/audio_0.wav'  # Update this with your audio file path
    audio_path = 'audio_output/audio_0.wav'
    print(prompt)
    return send_file(audio_path, mimetype='audio/wav')






#************************INSTRUMENT-TO-MUSIC******************************* GENERATE A MUSIC using onlt the instruments : 

@app.route("/api/instrument", methods=['GET', 'POST'])
def instrument_generate():
    data = request.json
    print(data['instruments'])
    instrument_array = data['instruments']
    prompt = 'Compose a music using only the instruments : ' + ', '.join(instrument_array)
    # duration = 10
    duration = data['duration']
    print("************DURATION************* : ",duration)
    duration = int(duration)
    print(type(duration))
    music_tensors = generate_music_tensors(prompt, duration)
    print("Musci Tensors: ", music_tensors)
    save_music_file = save_audio(music_tensors)
    # audio_path = 'C:/Users/shahr/OneDrive/Desktop/React Flask/AI-Music-generator/backend/audio_output/audio_0.wav'  # Update this with your audio file path
    audio_path = 'audio_output/audio_0.wav'
    print(prompt)
    return send_file(audio_path, mimetype='audio/wav')



#***************************AUDIO-TO-AUDIO******************************************
@app.route("/api/fprompt", methods=['GET', 'POST'])
def file_upload():
    
    if 'audioFile' not in request.files:
        return 'No file part', 400
    
    audio_file = request.files['audioFile']
    text_input = request.form.get('prompt')

    if audio_file.filename=='':
        return 'No selected file', 400
    
    #save file
    audio_file.save('uploaded_audio/'+audio_file.filename)

    print("Text input:", text_input)

    duration = request.form.get('duration')
    duration = int(duration)
    print(duration)
    x = duration
    model=MusicGen.get_pretrained("facebook/musicgen-melody")
    model.set_generation_params(duration=x)

    base_audio,sr=audio_read('uploaded_audio/hbd.wav')
    print(base_audio.shape)
    print(sr)

    
    base_audio=base_audio[:,:sr*duration]
    print(base_audio.shape)
    print(type(base_audio))
    l=[]
    l.append(text_input)
    melody_version=model.generate_with_chroma(descriptions=l,melody_wavs=base_audio,melody_sample_rate=sr,progress=True)
    save_file = save_audio(melody_version)


    audio_path = 'audio_output/audio_0.wav'
    return send_file(audio_path, mimetype='audio/wav')
    # return 'File uploaded successfully', 200
