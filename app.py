from flask import Flask, request
import requests


# Microsoft Text Analytics API : https://docs.microsoft.com/en-in/azure/cognitive-services/text-analytics/quickstarts/python
accessKey = "e3ca43f1d47642999f937d849028084b"
uri = "https://westcentralus.api.cognitive.microsoft.com"
sentiment_url = uri + "/text/analytics/v2.1/sentiment"

def GetSentiment(var1):
    #"Gets the sentiments for a set of documents and returns the JSON." The closer the score is to 1, the more positive
    # the text is.
    documents = {'documents': [
        {'id': '1', 'language': 'en', 'text': var1},
    ]}
    headers = {"Ocp-Apim-Subscription-Key": accessKey}
    response = requests.post(sentiment_url, headers=headers, json=documents)
    sentiments = response.json()
    #if the score is lower than 0.3, "negative" is returned. With this basic function, we can build upon the extension
    if sentiments["documents"][0]["score"] < 0.3:
        return "negative"
    else:
        return "positive"
    # Make sure that the final product does not really rely on this API, as this is not free.

app = Flask(__name__)

@app.route('/')
def change():
    love = GetSentiment("Happy")
    return love


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)