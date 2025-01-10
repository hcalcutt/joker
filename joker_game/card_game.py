from flask import Flask, jsonify, render_template
import random
import os

app = Flask(__name__, static_folder='images')

# Card suits and ranks
suits = ['heart', 'spade', 'club', 'diamond']
values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
backImages = [f'./images/card_backs/back{i + 1}.jpg' for i in range(8)]  # Assuming 8 card backs

# Create a deck of cards
def create_deck():
    deck = []
    for suit in suits:
        for value in values:
            card_name = f'{suit}{value}'
            deck.append(card_name)
    deck += ['joker', 'joker']  # Adding jokers
    random.shuffle(deck)  # Shuffle the deck initially
    return deck

# Flask routes
@app.route('/')
def index():
    return render_template('python.html')

@app.route('/draw_card', methods=['GET'])
def draw_card():
    if deck:
        card = deck.pop()  # Draw the top card from the deck
        card_image = f'/images/card_fronts/{card}.jpg'  # Assume the image files are in the images/card_fronts/ folder
        return jsonify({'card': card, 'image': card_image})
    else:
        return jsonify({'error': 'No cards left in the deck'}), 400

@app.route('/shuffle_deck', methods=['GET'])
def shuffle_deck():
    global deck
    deck = create_deck()  # Recreate and shuffle the deck
    return jsonify({'status': 'Deck shuffled'})

@app.route('/deal_cards', methods=['GET'])
def deal_cards():
    hand = []
    for _ in range(7):
        if deck:
            card = deck.pop()
            hand.append({'card': card, 'image': f'/images/card_fronts/{card}.jpg'})
    return jsonify({'hand': hand})

@app.route('/deck_count', methods=['GET'])
def deck_count():
    return jsonify({'count': len(deck)})

if __name__ == '__main__':
    deck = create_deck()  # Create and shuffle deck when app starts
    app.run(debug=True)
