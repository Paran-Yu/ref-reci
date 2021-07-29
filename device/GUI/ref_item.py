from PyQt5.QtWidgets import *
from PyQt5.QtCore import *

class RefItem(QWidget):
    def __init__(self):
        super().__init__()
        self.setObjectName("ref_item")
        self.resize(608, 192)
        self.ref_item_container = QPushButton(self)
        self.ref_item_container.setGeometry(QRect(0, 0, 608, 192))
        self.ref_item_container.setStyleSheet("background-color: #F2EDE7;\n"
                                              "border: 0px;")
        self.ref_item_container.setText("")
        self.ref_item_container.setObjectName("ref_item_container")
        self.ref_item_delete = QPushButton(self)
        self.ref_item_delete.setGeometry(QRect(0, 0, 48, 48))
        self.ref_item_delete.setStyleSheet("font: 75 18pt \"KoPubWorld돋움체 Bold\";\n"
                                           "color: #45423C;\n"
                                           "background-color: rgba(0,0,0,0);\n"
                                           "border: 0px;")
        self.ref_item_delete.setObjectName("ref_item_delete")
        self.ref_item_picture = QPushButton(self)
        self.ref_item_picture.setGeometry(QRect(0, 0, 248, 192))
        self.ref_item_picture.setStyleSheet("background-color: #FFFFFF;\n"
                                            "border-image: url(img/onion.png);\n"
                                            "border: 0px;")
        self.ref_item_picture.setText("")
        self.ref_item_picture.setObjectName("ref_item_picture")
        self.ref_item_name = QLabel(self)
        self.ref_item_name.setGeometry(QRect(272, 16, 321, 41))
        self.ref_item_name.setStyleSheet("font: 32pt \"KoPubWorld돋움체 Bold\";\n"
                                         "background-color: rgba(0,0,0,0);\n"
                                         "color: #45423C;")
        self.ref_item_name.setObjectName("ref_item_name")
        self.ref_item_category = QLabel(self)
        self.ref_item_category.setGeometry(QRect(272, 64, 137, 33))
        self.ref_item_category.setStyleSheet("font: 20pt \"KoPubWorld돋움체 Medium\";\n"
                                             "color: #45423C;\n"
                                             "background-color: rgba(0,0,0,0);")
        self.ref_item_category.setObjectName("ref_item_category")
        self.ref_item_day = QLabel(self)
        self.ref_item_day.setGeometry(QRect(272, 136, 105, 36))
        self.ref_item_day.setStyleSheet("font: 20pt \"KoPubWorld돋움체 Bold\";\n"
                                        "color: #ffffff;\n"
                                        "text-align: center;\n"
                                        "width: 120px;\n"
                                        "height: 40px;\n"
                                        "padding-top: 2px;\n"
                                        "background-color: #8DB554;\n"
                                        "border-radius: 15px;")
        self.ref_item_day.setAlignment(Qt.AlignCenter)
        self.ref_item_day.setObjectName("ref_item_day")
        self.ref_item_amount = QLabel(self)
        self.ref_item_amount.setGeometry(QRect(480, 72, 73, 49))
        self.ref_item_amount.setStyleSheet("font: 32pt \"KoPubWorld돋움체 Bold\";\n"
                                           "color: #45423C;\n"
                                           "background-color: rgba(0,0,0,0);")
        self.ref_item_amount.setAlignment(Qt.AlignCenter)
        self.ref_item_amount.setObjectName("ref_item_amount")
        self.ref_item_minus = QPushButton(self)
        self.ref_item_minus.setGeometry(QRect(440, 72, 48, 48))
        self.ref_item_minus.setStyleSheet("font: 32pt \"KoPubWorld돋움체 Bold\";\n"
                                          "color: #F9BC15;\n"
                                          "background-color: rgba(0,0,0,0);\n"
                                          "border: 0px;")
        self.ref_item_minus.setObjectName("ref_item_minus")
        self.ref_item_plus = QPushButton(self)
        self.ref_item_plus.setGeometry(QRect(544, 72, 48, 48))
        self.ref_item_plus.setStyleSheet("font: 32pt \"KoPubWorld돋움체 Bold\";\n"
                                         "color: #F9BC15;\n"
                                         "background-color: rgba(0,0,0,0);\n"
                                         "border: 0px;")
        self.ref_item_plus.setObjectName("ref_item_plus")
        self.retranslateUi()

    def retranslateUi(self):
        _translate = QCoreApplication.translate
        self.setWindowTitle(_translate("ref_item", "Form"))
        self.ref_item_delete.setText(_translate("ref_item", "X"))
        self.ref_item_name.setText(_translate("ref_item", "제품명"))
        self.ref_item_category.setText(_translate("ref_item", "분류"))
        self.ref_item_day.setText(_translate("ref_item", "D-0"))
        self.ref_item_amount.setText(_translate("ref_item", "0"))
        self.ref_item_minus.setText(_translate("ref_item", "-"))
        self.ref_item_plus.setText(_translate("ref_item", "+"))