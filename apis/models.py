from apis import db


class Textfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"Textfile('{self.content}')"
