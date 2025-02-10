import logging
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import worker

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

app.logger.setLevel(logging.ERROR)

@app.route('/api/process-message', methods=['POST'])
def process_message_route():
    try:
        user_message = request.json['userMessage']
        print('user_message', user_message)
        bot_response = worker.process_prompt(user_message)
        return jsonify({
            "botResponse": bot_response
        }), 200
    except Exception as e:
        return jsonify({
            "error": str(e),
            "botResponse": "Sorry, there was an error processing your message."
        }), 500

@app.route('/api/process-document', methods=['POST'])
def process_document_route():
    try:
        if 'file' not in request.files:
            return jsonify({
                "botResponse": "It seems like the file was not uploaded correctly, can you try "
                            "again. If the problem persists, try using a different file"
            }), 400

        file = request.files['file']
        
        os.makedirs('uploads', exist_ok=True)
        
        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)

        worker.process_document(file_path)

        return jsonify({
            "botResponse": "Thank you for providing your PDF document. I have analyzed it, so now you can ask me any "
                        "questions regarding it!"
        }), 200
    except Exception as e:
        return jsonify({
            "error": str(e),
            "botResponse": "Sorry, there was an error processing your document."
        }), 500

if __name__ == "__main__":
    app.run(debug=True, port=8000, host='0.0.0.0')