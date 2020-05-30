from flask import Flask, render_template, redirect, request
import requests

app = Flask(__name__)
app.config['SECRET_KEY'] = 'DVqdjvlqprl@!e4852dQvbst3gdQZYnpeltmxv8712azBde'


@app.route('/')
def change():
    return render_template('popup.html')

@app.route('/automatic')
def automatic():
    return render_template('automatic.html')

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)