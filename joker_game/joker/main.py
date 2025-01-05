import random

class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __str__(self):
        return f"{self.value} of {self.suit}"

class Deck:
    def __init__(self):
        self.cards = []
        self.build()

    def build(self):
        suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"]
        for suit in suits:
            for value in values:
                self.cards.append(Card(suit, value))
        self.cards.append(Card("Joker", "Black Joker"))
        self.cards.append(Card("Joker", "Red Joker"))

    def shuffle(self):
        random.shuffle(self.cards)

    def draw(self):
        if not self.cards:
            raise ValueError("No more cards left in the deck to draw.")
        return self.cards.pop()

class Player:
    def __init__(self, name):
        self.name = name
        self.hand = None

    def draw_card(self, deck):
        self.hand = deck.draw()

    def show_hand(self):
        return str(self.hand)

def card_value(card):
    if "Joker" in card.value:
        return 100  # Jokers have the highest value
    values = {
        "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
        "Jack": 11, "Queen": 12, "King": 13, "Ace": 14
    }
    return values.get(str(card.value), 0)

def play_game():
    print("Welcome to the Game Joker!")
    
    # Get the number of players and validate it
    while True:
        try:
            num_players = int(input("Enter the number of players (max 5): "))
            if num_players > 5:
                print("The maximum number of players is 5. Please enter a valid number.")
            elif num_players < 1:
                print("There must be at least 1 player. Try again.")
            else:
                break
        except ValueError:
            print("Invalid input. Please enter a number.")

    # Create deck and players
    print("Shuffling the deck...")
    deck = Deck()
    deck.shuffle()
    players = [Player(f"Player {i+1}") for i in range(num_players)]

    # Deal one card to each player
    print("Dealing cards...")
    for player in players:
        try:
            player.draw_card(deck)
            print(f"{player.name} drew: {player.show_hand()}")
        except ValueError as e:
            print(e)
            return

    # Determine the winner
    winner = max(players, key=lambda p: card_value(p.hand))
    print(f"The winner is {winner.name} with the card: {winner.show_hand()}!")

if __name__ == "__main__":
    play_game()
