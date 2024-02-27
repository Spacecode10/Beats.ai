from flask import current_app as app
from flask import jsonify, Flask, request
from .main_model import *
from flask import send_file

@app.route("/")
def index():
    return jsonify(message="ha done bhai")

@app.route("/api/prompt", methods=["GET", "POST"])
def load():
    data = request.json
    print(data)
    text = data['prompt']
    # duration = 10
    duration = data['duration']
    print("************DURATION************* : ",duration)
    print(type(duration))
    duration = int(duration)
    music_tensors = generate_music_tensors(text, duration)
    print("Musci Tensors: ", music_tensors)
    save_music_file = save_audio(music_tensors)
    audio_path = 'C:/Users/shahr/OneDrive/Desktop/React Flask/AI-Music-generator/backend/audio_output/audio_0.wav'  # Update this with your audio file path
    return send_file(audio_path, mimetype='audio/wav')
    # capitalized_text = text.upper()
    # return jsonify({'capitalizedText': capitalized_text})
    