from flask import current_app as app
from flask import jsonify, Flask, request
from .main_model import *
from flask import send_file

@app.route("/")
def index():
    return jsonify(message="ha done bhai")

@app.route("/api/prompt", methods=["GET", "POST"])
def text_generate():
    data = request.json
    print(data)
    prompt = data['prompt']
    # duration = 10
    duration = data['duration']
    print("************DURATION************* : ",duration)
    print(type(duration))
    duration = int(duration)
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