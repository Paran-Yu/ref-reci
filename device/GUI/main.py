from PyQt5.QtWidgets import *
from PyQt5.uic import *
from PyQt5 import QtWidgets
from ui_ref_item import Ui_ref_item
import sys


# start
class StartWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        loadUi("h_start.ui", self)

    def clicked_login(self):
        mainWidget.setCurrentIndex(mainWidget.currentIndex()+1)


# ref_list
class RefListWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        loadUi("h_ref_list.ui", self)
        self.main()



# main
if __name__ == "__main__":
    # main class
    app = QApplication(sys.argv)
    mainWidget = QtWidgets.QStackedWidget()

    # sizing main widget
    mainWidget.setFixedWidth(1280)
    mainWidget.setFixedHeight(720)

    # layouts
    startWindow = StartWindow()
    refListWindow = RefListWindow()

    # add layouts to main widget
    mainWidget.addWidget(startWindow)
    mainWidget.addWidget(refListWindow)

    mainWidget.show()
    app.exec()
