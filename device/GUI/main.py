from PyQt5.QtWidgets import *
from PyQt5.uic import *
from PyQt5 import QtWidgets
from PyQt5.QtCore import *
from ref_item import RefItem
from db import DB
import barcode_reader
import sys
import datetime


## 전역변수
# 유저정보
# USER_ID - 나중에 텍스트로 빼든지 할 것
USER_ID = 1

# 대분류 튜플
category_list = ('육류', '채소류', '해물류', '달걀/유제품', '가공식품류', '곡류', '밀가루', '건어물류', '버섯류', '향신료/조미료류', '과일류', '소스류', '발효식품', '기타')

# 오늘 날짜
today = datetime.date.today()
print(today)

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
        # USER_NAME의 냉장고 리스트
        self.title.setText("{}의 냉장고".format(USER_NAME))
        # 냉장고 목록 받아올 리스트
        self.ref_list_list = []                         # DB에서 딕셔너리로 받아오는 리스트
        self.ref_item_list = []                         # GUI에서 재료 카드를 담는 리스트
        # 냉장고 리스트 스크롤 영역
        self.scroll = QScrollArea(self)
        # 리스트 모드 -> 0 / 선택 모드 -> 1
        self.mode = 0
        # 선택모드는 숨김
        self.title_back.hide()
        self.title_recipe.hide()
        # 재료 선택 리스트
        self.selected_item = []
        self.selected_item_name = []
        self.selected_scroll = QScrollArea(self)
        self.selected_scroll.setGeometry(16, 192, 1248, 60)
        self.selected_scroll.setStyleSheet("border: 0px;")
        self.selected_scroll.hide()
        # 카테고리 pushbutton 리스트화
        self.title_category_list = (self.category_all, self.category_meat, self.category_vegi, self.category_fish, self.category_egg, self.category_other)
        self.title_category_index = 0
        self.main()

    def main(self):
        self.read_ref_list()
    
    # DB에서 사용자의 냉장고 리스트를 불러오기
    def read_ref_list(self):
        self.clear_list()
        # 카테고리 선택에 따른 제품 목록 리스트로 가져오기
        # item_name, item_count, item_createDay, item_category1
        if self.title_category_index == 0:
            # 전체 선택시
            self.ref_list_list = refDB.get_UserProducts(USER_ID)
        elif self.title_category_index == 5:
            # 기타 선택시
            self.ref_list_list = refDB.get_UserProducts_Classifi1_Extra(USER_ID)
        else:
            # 카테고리 선택시
            self.ref_list_list = refDB.get_UserProducts_Classifi1(USER_ID, self.title_category_index)
        print(self.title_category_index)
        print("새로 불러온 리스트")
        print(self.ref_list_list)

        # [더미 데이터]
        # self.ref_list_list = []
        # self.ref_list_list = [['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png'], ['양파', '채소류', 3, '2021-7-20', '2021-8-20', 'img/onion.png']]

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
        print("리스트 그리기")
        # GridLayout 생성 및 조정
        ref_list_layout = QGridLayout()
        ref_list_layout.setContentsMargins(16, 16, 16, 16)
        ref_list_layout.setColumnMinimumWidth(0, 608)
        ref_list_layout.setColumnMinimumWidth(1, 608)
        for i in range(int(self.count / 2) + 1):
            ref_list_layout.setRowMinimumHeight(i, 192)
            # print(i)

        # 위젯 그룹에 리스트 카드 하나씩 넣기
        ref_list_groupBox = QGroupBox("")          # GUI에서 카드를 담는 그룹박스
        for i in range(self.count):
            self.ref_item_list.append(RefItem())
            # 데이터 플로팅
            print(self.ref_list_list[i]['item_category2'])
            # print("border-image: url(img/category2/%s.jpg)" % self.ref_list_list[i]['item_category2'])
            self.ref_item_list[i].set_upID(self.ref_list_list[i]['upID'])
            self.ref_item_list[i].ref_item_picture.setStyleSheet("border-image: url(img/category2/{}.jpg);\n".format(self.ref_list_list[i]['item_category2']))
            self.ref_item_list[i].set_ref_item_name(self.ref_list_list[i]['item_name'])
            self.ref_item_list[i].set_ref_item_category(self.ref_list_list[i]['item_category1'])

            self.dday = self.ref_list_list[i]['item_expDay'] - today
            # print(self.dday)
            # print(self.dday.days)
            self.ref_item_list[i].set_ref_item_day("D-{}".format(self.dday.days))
            self.ref_item_list[i].set_ref_item_count(str(self.ref_list_list[i]['item_count']))
            # click event slot 추가
            self.ref_item_list[i].ref_item_container.clicked.connect(self.clicked_ref_items)
            self.ref_item_list[i].ref_item_picture.clicked.connect(self.clicked_ref_items)
            self.ref_item_list[i].ref_item_delete.clicked.connect(self.clicked_delete)
            ref_list_layout.addWidget(self.ref_item_list[i])
        ref_list_groupBox.setLayout(ref_list_layout)
        print("생성된 아이템 카드")
        print(ref_list_groupBox)
        print(self.ref_item_list)
        ref_list_groupBox.raise_()

        # Scroll Area 생성하여 리스트 집어넣기
        self.scroll.setGeometry(16, 264, 1248, 472)
        self.scroll.setVerticalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
        self.scroll.setStyleSheet("border: 0px;")
        self.scroll.setWidget(ref_list_groupBox)
        self.scroll.setWidgetResizable(False)
        # scroll.setFixedWidth(1200)
        # scroll.setFixedHeight(500)

    def clear_list(self):
        #trash = QWidget()
        self.scroll.takeWidget()
        self.ref_list_list = []
        self.ref_item_list = []


    def clicked_category(self):
        selected_category = self.sender()
        # print(selected_category)
        # print(self.category_list.index(selected_category)
        new_title_category_index = self.title_category_list.index(selected_category)
        print(self.title_category_index)
        print(new_title_category_index)

        # style sheet 변경
        self.title_category_list[self.title_category_index].setStyleSheet("font: 24pt \"KoPubWorld돋움체 Medium\";\n"
                                                              "color: #A29D97;\n"
                                                              "background-color: rgba(0,0,0,0);\n"
                                                              "border: 2px solid #A29D97;\n"
                                                              "border-radius: 8px;")
        self.title_category_list[new_title_category_index].setStyleSheet("font: 24pt \"KoPubWorld돋움체 Medium\";\n"
                                                              "color: #F19920;\n"
                                                              "background-color: rgba(0,0,0,0);\n"
                                                              "border: 2px solid #F19920;\n"
                                                              "border-radius: 8px;")

        self.title_category_index = new_title_category_index
        # 표시 변경
        self.read_ref_list()


    # 리스트 모드 - Add 버튼 클릭 시
    def clicked_title_add(self):
        mainWidget.setCurrentIndex(mainWidget.currentIndex() + 1)

    # 리스트 모드 - Search 버튼 클릭 시
    def clicked_title_search(self):
        self.mode = 1
        ## 화면설정
        # 기존 위젯 숨김
        self.title_search.hide()
        self.title_add.hide()
        self.ref_list_count.hide()
        self.ref_list_sort.hide()

        # 선택화면 용 위젯 표시
        self.title_back.show()
        self.title_recipe.show()
        self.selected_scroll.show()


    def clicked_ref_items(self):
        ## 선택한 재료 표시
        sender = self.sender()
        print(sender)

        # 리스트 모드 -> 다이얼로 수량 조정 가능


        # 선택 모드 -> 뱃지 생성
        if self.mode == 1:
            # 클릭한 재료가 무엇인지 판별 -> 기존 선택 목록에 없으면 추가
            for i in range(self.count):
                if sender == self.ref_item_list[i].ref_item_container or sender == self.ref_item_list[i].ref_item_picture:
                    if self.ref_list_list[i]['item_category2'] not in self.selected_item_name:
                        self.selected_item_name.append(self.ref_list_list[i]['item_category2'])

        print("선택된 재료")
        print(self.selected_item_name)
        self.draw_selected()

    # 클릭 시 만들어진 선택 목록을 그리는 함수
    def draw_selected(self):
        # 레이아웃 생성 및 조정
        selected_layout = QGridLayout()
        selected_layout.setContentsMargins(16, 0, 16, 0)
        selected_layout.setRowMinimumHeight(0, 60)
        # 선택 갯수만큼 열 생성
        for i in range(len(self.selected_item_name)):
            selected_layout.setColumnMinimumWidth(i, 120)

        selected_groupBox = QGroupBox("")
        print("그룹박스")
        for i in self.selected_item_name:
            # 버튼 생성
            selected = QPushButton()
            selected.setText(i)
            print(len(i))
            selected.setMinimumSize(108 + (len(i) * 10), 56)
            selected.setStyleSheet("font: 24pt \"KoPubWorld돋움체 Medium\";\n"
                                   "color: #8DB554;\n"
                                   "background-color: #FFFFFF;\n"
                                   "border: 2px solid #8DB554;\n"
                                   "border-radius: 26px;")
            self.selected_item.append(selected)
            selected_layout.addWidget(selected)
        selected_groupBox.setLayout(selected_layout)
        selected_groupBox.raise_()

        # Scroll Area 생성하여 선택 리스트 집어넣기
        self.selected_scroll.setWidget(selected_groupBox)
        self.selected_scroll.setHorizontalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
        self.selected_scroll.setVerticalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
        self.selected_scroll.setWidgetResizable(False)
        self.selected_scroll.raise_()



    # 선택 모드 - 뒤로가기 클릭 시 =>
    def clicked_back(self):
        self.mode = 0

        # 선택된 재료 리스트 비우기
        self.selected_item = []
        self.selected_item_name = []

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

    def clicked_delete(self):
        print("delete")
        sender = self.sender()
        delete_index = -1
        for i in range(len(self.ref_item_list)):
            if self.ref_item_list[i].ref_item_delete == sender:
                print(i)
                delete_index = i
        # print(self.upID)
        refDB.del_UserProducts(self.ref_item_list[delete_index].upID)
        self.read_ref_list()



# 2 add items
class AddWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        loadUi("h_ref_add.ui", self)

        self.add_item_category2 = ""
        # 추가 화면 초기화
        self.count = int(self.add_item_count.text())
        self.category_index = -1
        self.today_str = today.strftime('%Y-%m-%d')
        self.add_item_createDay.setText(self.today_str)
        # self.add_item_expDay.setText(self.today_str)
        # 소분류 리스트 초기화
        self.name_list = []
        self.name_list_index = 0
        self.main()
        # 수량 단위 버튼 리스트
        self.btn_num_list = (self.add_item_1, self.add_item_10, self.add_item_100)
        self.count_unit = (1, 10, 100)
        self.btn_num_index = 0

    def main(self):
        pass

    # 냉장고 리스트로 돌아가기
    def clicked_back(self):
        self.reset_all()
        refListWindow.read_ref_list()
        mainWidget.setCurrentIndex(mainWidget.currentIndex() - 1)

    # 화면에 표시된 내용을 DB에 추가
    def clicked_next(self):
        # 저장된 내용을 DB에 넣는 쿼리문 추가
        data = dict()
        data['user_id'] = USER_ID
        data['item_name'] = self.add_item_name.text()
        data['item_category1'] = self.add_item_category.text()
        data['item_category2'] = self.add_item_category2
        data['item_expDay'] = "%s-%s-%s" % (self.add_item_exp_year.text(), self.add_item_exp_month.text(), self.add_item_exp_day.text())
        data['item_count'] = int(self.add_item_count.text())
        data['item_image'] = "{}.jpg".format(self.add_item_name.text())
        data['item_category1_id'] = self.category_index + 1
        classifi2_idx = refDB.get_Classifi2_id(data['item_category2'])
        data['item_category2_id'] = classifi2_idx
        print([data])
        refDB.add_UserProducts([data])
        self.reset_all()

    # 음성인식 입력 모드
    def clicked_voice(self):
        pass

    # 바코드 입력 모드
    def clicked_barcode(self):
        print("barcode reader start!!")
        self.barcode_btn.setEnabled(False)
        # 바코드 리더 함수 호출 - 제품명 가져오기
        item_name = barcode_reader.barcode_recognition()
        # print(item_name)
        # 제품명으로 소분류, 대분류 찾기
        result = refDB.get_Product_category(item_name)
        if result != -1:
            # print(result[-1])
            self.add_item_name.setText(item_name)
            self.add_item_category.setText(result[-1][0])
            self.add_item_count.setText("1")
            self.add_item_category2 = result[-1][2]
            self.category_index = result[-1][4]
            self.name_list_index = result[-1][5]
            self.add_item_image.setStyleSheet("border-image: url(img/category2/%s)" % result[-1][3])
        self.barcode_btn.setEnabled(True)


    # 뒤로가기, 다음 버튼 클릭 시 모든 값 초기화
    def reset_all(self):
        self.add_item_image.setStyleSheet("background-color: #FFFFFF")
        self.add_item_category.setText("제품분류")
        self.add_item_name.setText("제품명")
        self.add_item_createDay.setText(self.today_str)
        self.add_item_expDay.setText(self.today_str)
        self.add_item_exp_year.setText("0000")
        self.add_item_exp_month.setText("00")
        self.add_item_exp_day.setText("00")
        self.add_item_count.setText("0")
        self.category_index = -1
        self.name_list_index = 0
        self.count = 0

    # 제품분류 클릭시 대분류 이동
    def clicked_category(self):
        if self.category_index == len(category_list) - 1:
            self.category_index = 0
        else:
            self.category_index += 1

        # 대분류 안의 소분류 불러오기
        self.name_list = refDB.get_Classifi1_To_Classifi2(category_list[self.category_index])
        print(self.name_list)
        # 소분류 인덱스 초기화 - 대분류가 바뀔 때 마다 인덱스 초기화!
        self.name_list_index = 0
        # 대분류 화면에 표시
        self.add_item_category.setText(category_list[self.category_index])

    # 제품명 클릭시 소분류 이동
    def clicked_name(self):
        print(self.name_list)
        print(self.name_list_index)
        if self.category_index > -1:
            self.add_item_name.setText(self.name_list[self.name_list_index][1])

        if self.name_list_index == len(self.name_list) - 1:
            self.name_list_index = 0
        else:
            self.name_list_index += 1
        self.add_item_category2 = self.name_list[self.name_list_index - 1][1]
        print("border-image: url(img/category2/{})".format(self.name_list[self.name_list_index][2]))
        self.add_item_image.setStyleSheet("border-image: url(img/category2/{});".format(self.name_list[self.name_list_index - 1][2]))

    # 제품 등록일 변경
    def clicked_create(self):
        pass

    # 제품 유통기한 변경
    def clicked_exp(self):
        pass

    def clicked_exp_year(self):
        print("exp_year")
        if self.add_item_exp_year.text() == "0000":
            self.add_item_exp_year.setText(str(today.year))
        else:
            self.add_item_exp_year.setText(str(int(self.add_item_exp_year.text()) + 1))

    def clicked_exp_month(self):
        print("exp_month")
        if self.add_item_exp_month.text() == "00":
            self.add_item_exp_month.setText(str(today.month).zfill(2))
        elif self.add_item_exp_month.text() == "12":
            self.add_item_exp_month.setText("01")
        else:
            self.add_item_exp_month.setText(str(int(self.add_item_exp_month.text()) + 1).zfill(2))

    def clicked_exp_day(self):
        print("exp_day")
        if self.add_item_exp_day.text() == "00":
            self.add_item_exp_day.setText(str(today.day).zfill(2))
        elif self.add_item_exp_month.text() in ("01", "03", "05", "07", "08", "10", "12"):
            if self.add_item_exp_day.text() == "31":
                self.add_item_exp_day.setText("01")
            else:
                self.add_item_exp_day.setText(str(int(self.add_item_exp_day.text()) + 1).zfill(2))
        elif self.add_item_exp_month.text() in ("04", "06", "09", "11"):
            if self.add_item_exp_day.text() == "30":
                self.add_item_exp_day.setText("01")
            else:
                self.add_item_exp_day.setText(str(int(self.add_item_exp_day.text()) + 1).zfill(2))
        else:
            if self.add_item_exp_day.text() == "28":
                self.add_item_exp_day.setText("01")
            else:
                self.add_item_exp_day.setText(str(int(self.add_item_exp_day.text()) + 1).zfill(2))


    # 수량 마이너스 - 선택된 단위에 따라
    def clicked_minus(self):
        self.count -= self.count_unit[self.btn_num_index]
        if self.count < 0:
            self.count = 0
        self.add_item_count.setText(str(self.count))

    # 수량 플러스 - 선택된 단위에 따라
    def clicked_plus(self):
        self.count += self.count_unit[self.btn_num_index]
        if self.count > 1000:
            self.count = 1000
        self.add_item_count.setText(str(self.count))

    # 수량 단위 선택 - 1, 10, 100
    def clicked_num(self):
        btn_num = self.sender()
        # print(btn_num)
        new_btn_num_index = self.btn_num_list.index(btn_num)
        # print(new_btn_num_index)

        # 선택되면 스타일시트 변경
        self.btn_num_list[self.btn_num_index].setStyleSheet("font: 24pt \"KoPubWorld돋움체 Medium\"; \n"
                                                            "color:  #F9BC15;\n"
                                                            "background-color:  #FFFFFF;\n"
                                                            "border: 2px solid #F9BC15;\n"
                                                            "border-radius: 26px;")
        self.btn_num_list[new_btn_num_index].setStyleSheet("font: 24pt \"KoPubWorld돋움체 Medium\"; \n"
                                                            "color:  #FFFFFF;\n"
                                                            "background-color:  #F9BC15;\n"
                                                            "border: 2px solid #F9BC15;\n"
                                                            "border-radius: 26px;")

        self.btn_num_index = new_btn_num_index


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
    # DB connect
    refDB = DB()

    # 유저 정보 불러오기
    global USER_NAME
    USER_NAME = refDB.get_User_Name(USER_ID)

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