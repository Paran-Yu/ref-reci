from PyQt5.QtWidgets import *
from PyQt5.uic import *
from PyQt5 import QtWidgets
from PyQt5.QtCore import *
from ref_item import RefItem
import sys


# 0 start
class StartWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        loadUi("h_start.ui", self)
        self.main()

    def main(self):
        pass

    # QR 코드 인식
    def login_with_QR(self):
        pass


    # 로그인 성공시
    def clicked_login(self):
        mainWidget.setCurrentIndex(mainWidget.currentIndex()+1)


# 1 ref_list
class RefListWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.main()

    def main(self):
        loadUi("h_ref_list.ui", self)
        self.read_ref_list()
        pass
    
    # DB에서 사용자의 냉장고 리스트를 불러오기
    def read_ref_list(self):
        ref_list_list = []
        # DB 쿼리문 날리기

        # 받아온 목록 리스트에 저장
        # 제품명 대분류 수량 등록일 유통기한 사진
        # [더미 데이터] - 나중에 지울 것!!
        self.ref_list_list = [['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png']]

        self.ref_list_amount = len(self.ref_list_list)
        # 리스트가 없다면 빈 화면
        if self.ref_list_amount == 0:
            print("there is no ingredient")
        # 리스트가 있다면 끝까지 그리기
        else:
            self.draw_ref_list()

    # 받아온 리스트를 ui에 그리기
    def draw_ref_list(self):
        # GridLayout 생성 및 조정
        ref_list_layout = QGridLayout()
        ref_list_layout.setContentsMargins(16, 16, 16, 16)
        ref_list_layout.setColumnMinimumWidth(0, 608)
        ref_list_layout.setColumnMinimumWidth(1, 608)
        for i in range(int(self.ref_list_amount / 2) + 1):
            ref_list_layout.setRowMinimumHeight(i, 192)
            # print(i)

        # 위젯 그룹 생성하여 리스트 카드 하나씩 넣기
        ref_list_groupBox = QGroupBox("")
        ref_item_list = []
        for i in range(self.ref_list_amount):
            ref_item_list.append(RefItem())
            # 더미데이터 - 수정 필요
            ref_item_list[i].set_ref_item_name("양파")
            ref_item_list[i].set_ref_item_category("채소류")
            ref_item_list[i].set_ref_item_day("D-3")
            ref_item_list[i].set_ref_item_amount(str(i))
            ref_list_layout.addWidget(ref_item_list[i])
        ref_list_groupBox.setLayout(ref_list_layout)

        # Scroll Area 생성하여 리스트 집어넣기
        scroll = QScrollArea(self)
        scroll.setGeometry(16, 264, 1248, 528)
        scroll.setVerticalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
        scroll.setStyleSheet("border: 0px;")
        scroll.setWidget(ref_list_groupBox)
        scroll.setWidgetResizable(False)
        #scroll.setFixedWidth(1200)
        #scroll.setFixedHeight(500)

        pass

    # Add 버튼 클릭 시
    def clicked_title_add(self):
        mainWidget.setCurrentIndex(mainWidget.currentIndex() + 1)


# 2 add items
class AddWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        loadUi("h_ref_add.ui", self)
        self.main()

    def main(self):
        pass


# 3 select items
class SelectWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        loadUi("h_ref_select.ui", self)
        self.main()

    def main(self):
        pass


# 4 search items
class SearchWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        # loadUi("h_ref_add.ui", self)
        self.main()

    def main(self):
        pass


# 5 recipe result
class RecipeResultWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        # loadUi("h_ref_add.ui", self)
        self.main()

    def main(self):
        pass


# 6 recipe detail
class RecipeDetailWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        # loadUi("h_ref_add.ui", self)
        self.main()

    def main(self):
        pass


# main
if __name__ == "__main__":
    # main class
    app = QApplication(sys.argv)
    mainWidget = QtWidgets.QStackedWidget()

    # sizing main widget
    mainWidget.setFixedWidth(1280)
    mainWidget.setFixedHeight(720)

    # create page instances
    startWindow = StartWindow()
    refListWindow = RefListWindow()
    addWindow = AddWindow()

    # add pages to main widget stack
    mainWidget.addWidget(startWindow)
    mainWidget.addWidget(refListWindow)
    mainWidget.addWidget(addWindow)

    mainWidget.show()
    app.exec()
