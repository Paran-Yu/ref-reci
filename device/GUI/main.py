from PyQt5.QtWidgets import *
from PyQt5.uic import *
from PyQt5 import QtWidgets
from PyQt5.QtCore import *
from ref_item import RefItem
import sys
import datetime


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
        loadUi("h_ref_list.ui", self)
        # 선택모드는 숨김
        self.title_back.hide()
        self.title_recipe.hide()
        # 카테고리 pushbutton 리스트화
        self.category_list = (self.category_all, self.category_vegi, self.category_meat, self.category_fish, self.category_egg, self.category_other)
        self.category_index = 0
        self.main()

    def main(self):
        self.read_ref_list()
    
    # DB에서 사용자의 냉장고 리스트를 불러오기
    def read_ref_list(self):
        ref_list_list = []
        # DB 쿼리문 날리기

        # 받아온 목록 리스트에 저장
        # 제품명 대분류 수량 등록일 유통기한 사진
        # [더미 데이터] - 나중에 지울 것!!
        # self.ref_list_list = []
        self.ref_list_list = [['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png']]

        self.count = len(self.ref_list_list)
        self.ref_list_count.setText('총 %d개' % self.count)
        # 리스트가 없다면 빈 화면
        if self.count == 0:
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
        for i in range(int(self.count / 2) + 1):
            ref_list_layout.setRowMinimumHeight(i, 192)
            # print(i)

        # 위젯 그룹 생성하여 리스트 카드 하나씩 넣기
        ref_list_groupBox = QGroupBox("")
        self.ref_item_list = []
        for i in range(self.count):
            self.ref_item_list.append(RefItem())
            # 더미데이터 - 수정 필요
            self.ref_item_list[i].set_ref_item_name("양파")
            self.ref_item_list[i].set_ref_item_category("채소류")
            self.ref_item_list[i].set_ref_item_day("D-3")
            self.ref_item_list[i].set_ref_item_count(str(i))
            # click event slot 추가
            self.ref_item_list[i].ref_item_container.clicked.connect(self.clicked_ref_items)
            self.ref_item_list[i].ref_item_picture.clicked.connect(self.clicked_ref_items)
            ref_list_layout.addWidget(self.ref_item_list[i])
        ref_list_groupBox.setLayout(ref_list_layout)

        # Scroll Area 생성하여 리스트 집어넣기
        self.scroll = QScrollArea(self)
        self.scroll.setGeometry(16, 264, 1248, 528)
        self.scroll.setVerticalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
        self.scroll.setStyleSheet("border: 0px;")
        self.scroll.setWidget(ref_list_groupBox)
        self.scroll.setWidgetResizable(False)
        #scroll.setFixedWidth(1200)
        #scroll.setFixedHeight(500)


    def clicked_category(self):
        selected_category = self.sender()
        # print(selected_category)
        # print(self.category_list.index(selected_category))
        new_category_index = self.category_list.index(selected_category)

        # style sheet 변경
        self.category_list[self.category_index].setStyleSheet("font: 24pt \"KoPubWorld돋움체 Medium\";\n"
                                                              "color: #A29D97;\n"
                                                              "background-color: rgba(0,0,0,0);\n"
                                                              "border: 2px solid #A29D97;\n"
                                                              "border-radius: 8px;")
        self.category_list[new_category_index].setStyleSheet("font: 24pt \"KoPubWorld돋움체 Medium\";\n"
                                                              "color: #F19920;\n"
                                                              "background-color: rgba(0,0,0,0);\n"
                                                              "border: 2px solid #F19920;\n"
                                                              "border-radius: 8px;")

        # 표시 변경
        ##작성하세요~##

        self.category_index = new_category_index


    # 리스트 모드 - Add 버튼 클릭 시
    def clicked_title_add(self):
        mainWidget.setCurrentIndex(mainWidget.currentIndex() + 1)

    # 리스트 모드 - Search 버튼 클릭 시
    def clicked_title_search(self):
        ## 화면설정
        # 기존 위젯 숨김
        self.title_search.hide()
        self.title_add.hide()
        self.ref_list_count.hide()
        self.ref_list_sort.hide()

        # 선택화면 용 위젯 표시
        self.title_back.show()
        self.title_recipe.show()


    def clicked_ref_items(self):
        ## 선택한 재료 표시
        sender = self.sender()
        print(sender)

        #self.scroll.setGeometry(16, 272, 1248, 528)

    # 선택 모드 - 뒤로가기 클릭 시 =>
    def clicked_back(self):
        # 선택화면 용 위젯 숨김
        self.title_back.hide()
        self.title_recipe.hide()

        # 기존 다시 표시
        self.title_search.show()
        self.title_add.show()
        self.ref_list_count.show()
        self.ref_list_sort.show()

    # 선택 모드 - 레시피 클릭 시 => 선택된 재료로 레시피 검색
    def clicked_recipe(self):
        mainWidget.setCurrentIndex(mainWidget.currentIndex() + 1)



# 2 add items
class AddWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        loadUi("h_ref_add.ui", self)

        self.count = int(self.add_item_count.text())
        self.category_index = 0
        self.category_list = ('육류', '채소류', '해물류', '달걀/유제품', '가공식품류', '곡류', '밀가루', '건어물류', '버섯류', '조미료류', '과일류', '소스류', '발효식품', '기타')
        now = datetime.datetime.now()
        self.nowDate = now.strftime('%Y-%m-%d')
        self.add_item_createDay.setText(self.nowDate)
        self.add_item_expDay.setText(self.nowDate)
        self.main()

    def main(self):
        pass

    def clicked_back(self):
        self.reset_all()
        mainWidget.setCurrentIndex(mainWidget.currentIndex() - 1)

    def clicked_next(self):
        # 저장된 내용을 DB에 넣는 쿼리문 추가
        self.reset_all()

    def reset_all(self):
        self.add_item_category.setText("제품분류")
        self.add_item_name.setText("제품명")
        self.add_item_createDay.setText(self.nowDate)
        self.add_item_expDay.setText(self.nowDate)
        self.add_item_count.setText("0")


    def clicked_category(self):
        self.add_item_category.setText(self.category_list[self.category_index])
        print(len(self.category_list))
        if self.category_index == len(self.category_list) - 1:
            self.category_index = 0
        else:
            self.category_index += 1

    def clicked_name(self):
        pass

    def clicked_create(self):
        pass

    def clicked_exp(self):
        pass

    def clicked_minus(self):
        if self.count > 0:
            self.count -= 1
            self.add_item_count.setText(str(self.count))

    def clicked_plus(self):
        if self.count < 100:
            self.count += 1
            self.add_item_count.setText(str(self.count))


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