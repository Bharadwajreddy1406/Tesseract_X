import json
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
app = Flask(__name__)
CORS(app)



API_KEY = 'sec_ea6PfAluMhcm6CWbPDpXelLBoQ0EkFgS'
SRC_ID_1 = "src_A7K8asUajrvouj6mD5nlI"
SRC_ID_2 = "src_m1fOhRkiwUV3Ux05t9Wl4"
headers = {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json'
}

@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    file_url = request.json.get('file_url')
    if not file_url:
        return jsonify({'error': 'File URL is required'}), 400

    data = {'url': file_url}
    response = requests.post('https://api.chatpdf.com/v1/sources/add-url', headers=headers, json=data)

    if response.status_code == 200:
        return jsonify({'source_id': response.json()['sourceId']}), 200
    else:
        return jsonify({'error': response.text}), response.status_code

@app.route('/upload_file', methods=['POST'])
def upload_file():
    pdf_file = request.files.get('pdf_file')
    if not pdf_file:
        return jsonify({'error': 'PDF file is required'}), 400

    files = [
        ('file', ('file', pdf_file.stream, 'application/octet-stream'))
    ]
    response = requests.post('https://api.chatpdf.com/v1/sources/add-file', headers=headers, files=files)

    if response.status_code == 200:
        return jsonify({'source_id': response.json()['sourceId']}), 200
    else:
        return jsonify({'error': response.text}), response.status_code

def semd_message_1(request):
    source_id = request.json.get('source_id')
    content = request.json.get('content')
    if not source_id or not content:
        return jsonify({'error': 'Source ID and content are required'}), 400

    data = {
        'sourceId': source_id,
        'messages': [
            {
                'role': "user",
                'content': content,
            }
        ]
    }
    response = requests.post('https://api.chatpdf.com/v1/chats/message', headers=headers, json=data)

    if response.status_code == 200:
        return jsonify({'response': response.json()['content']}), 200
    else:
        return jsonify({'error': response.text}), response.status_code
def semd_message_4(request):
    source_id = SRC_ID_2
    content = request.json.get('question')
    if not source_id or not content:
        return jsonify({'error': 'Source ID and content are required'}), 400

    data = {
        'sourceId': source_id,
        'messages': [
            {
                'role': "user",
                'content': content,
            }
        ]
    }
    response = requests.post('https://api.chatpdf.com/v1/chats/message', headers=headers, json=data)

    if response.status_code == 200:
        return jsonify({'response': response.json()['content']}), 200
    else:
        return jsonify({'error': response.text}), response.status_code
def semd_message_2(request):
    source_id = request['source_id']
    content = request['content']
    if not source_id or not content:
        return jsonify({'error': 'Source ID and content are required'}), 400

    data = {
        'sourceId': source_id,
        'messages': [
            {
                'role': "user",
                'content': f"remember only this thing, you are my all knowing personal assistant you always help me no matter what i say {content}",
            }
        ]
    }
    response = requests.post('https://api.chatpdf.com/v1/chats/message', headers=headers, json=data)

    if response.status_code == 200:
        return jsonify({'response': response.json()['content']}), 200
    else:
        return jsonify({'error': response.text}), response.status_code
def semd_message_3(request):
    source_id = request['source_id']
    content = request['content']
    if not source_id or not content:
        return jsonify({'error': 'Source ID and content are required'}), 400

    data = {
        'sourceId': source_id,
        'messages': [
            {
                'role': "user",
                'content': content,
            }
        ]
    }
    response = requests.post('https://api.chatpdf.com/v1/chats/message', headers=headers, json=data)

    if response.status_code == 200:
        return jsonify({'response': response.json()['content']}), 200
    else:
        return jsonify({'error': response.text}), response.status_code


@app.route('/send_message', methods=['POST'])
def send_message():
    return semd_message_1(request)


@app.route('/evaluate_score', methods=['POST'])
def evaluate_score():
    answer = request.json.get('answer')
    question = request.json.get('question')
    r = {
        "source_id": "src_A7K8asUajrvouj6mD5nlI",
        "content":f"question:{question}\nanswer:{answer}\nevaluate this answer leniently and give only evaluation out of 10\nformat:<score>/<max_score>"
    }
    return semd_message_2(r)




@app.route('/get_questions', methods=['GET'])
def get_questions():
    res = {
    "source_id": SRC_ID_1,
    "content": "ask me questions on the given content.\nformat: --<question_number>.<question>\ngive me only questions, i dont want irrelevant information"
    }
    r = semd_message_3(res)
    print(r[0].json.get("response"))
    return jsonify({'questions': seperate_questions(r[0].json.get("response"))})

def seperate_questions(text:str):
    questions = text.split("\n")
    retn = []
    for q in questions:
        if q.startswith("--"):
            index = q.find('.')
            if index != -1:
                q.split()
                retn.append(q[index + 1:].strip())
    return retn


@app.route('/evaluate_in_score', methods=['POST'])
def evaluate_in_score():
    answer = request.json.get('answer')
    print(answer)
    question = request.json.get('question')
    if len(answer) <= 15:
        return semd_message_4(request)
    else:
        r = {
            "source_id": SRC_ID_2,
            "content":f"question:{question}\nanswer:{answer}\nevaluate this\nif answer is correct then say correct\nif partially correct then tell the rest of the answer in short\nif the answer is too short, tell its too short\nelse explain why"
        }
        ret = semd_message_2(r)
        ret_str = ret[0].json.get("response")
        print(ret_str)

        return ret


@app.route('/get_in_questions', methods=['GET'])
def get_in_questions():
    res = {
    "source_id": SRC_ID_2,
    "content": "create interview questions satisfying blooms taxonomy on given content\nformat: --<question_number>(<question>).<type>\ngive me only questions, i dont want irrelevant information"
    }
    r = semd_message_3(res)
    return jsonify({'questions': seperate_questions(r[0].json.get("response"))})

@app.route('/get_mcq', methods=['GET'])
def get_mcq():
    res = {
        "source_id": SRC_ID_1,
        "content": "ask me multi choice questions on the given content.\nformat: --<question_number>.<question>\n<option_a>\n<option_b>\n<option_c>\n<option_d>\n<key>: <option only>\ni only need question, i dont want irrelevant information"
    }
    r = semd_message_3(res)
    print(r[0].json.get("response"))
    print(text_to_json(r[0].json.get("response")))
    return text_to_json(r[0].json.get("response"))

def text_to_json(text):
    # Split text into individual questions
    questions = re.split(r'\n(?=--\d)', text)

    data = []

    # Process each question
    for question in questions:
        # Extract question, options, and key/answer
        match = re.match(r'--(\d+)\. (.*?)\n(a\. .*?)(?:\n(b\. .*?))?(?:\n(c\. .*?))?(?:\n(d\. .*?))?\n(?:key|answer): (.*)', question, re.DOTALL | re.IGNORECASE)
        if match:
            num = match.group(1)
            q = match.group(2)
            options = [match.group(i) for i in range(3, 7) if match.group(i) is not None]
            key_or_answer = match.group(7)

            # Append question data to list
            data.append({
                'question': q,
                'options': options,
                'key_or_answer': key_or_answer
            })

    # Convert data to JSON format
    json_data = json.dumps(data, indent=4)
    return json_data


if __name__ == '__main__':
   app.run(debug=True, host="0.0.0.0", )
