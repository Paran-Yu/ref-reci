from PyQt5.QtWidgets import *
from PyQt5.uic import *
import sys


class MyApp(QMainWindow):
    def __init__(self):
        super().__init__()
        loadUi("start.ui", self)


app = QApplication(sys.argv)
win = MyApp()
win.show()
app.exec()