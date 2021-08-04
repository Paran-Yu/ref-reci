import pymysql
import datetime

# get : read
# set : update
# add : add
# del : remove

class DB:
    def __init__(self):
        self.db = pymysql.connect(
            user='user',
            passwd='a203!',
            host='i5a203.p.ssafy.io',
            db='project',
            charset='utf8',
            port=3306
        )

    def get_Classifi1_To_Classifi2(self, classifi1_category):
        '''
        대분류에서 소분류를 받아오는 함수
        :return ((소분류1, 소분류1.jpg), (소분류2, 소분류2.jpg)...)
        '''

        cursor = self.db.cursor()
        sql = "SELECT c2.Classification2Name, c2.Classification2Image  FROM Classification2 c2, Classification1 c1 " \
              "WHERE c1.classification1Name = %s and c2.Classification2to1 = c1.c1ID;"

        cursor.execute(sql, classifi1_category)
        result = cursor.fetchall()
        return result

    def get_Product_category(self, name):
        '''
        제품의 대분류, 소분류를 가져올 때 사용
        소분류가 2개 이상이면 마지막에 나온 재료로 분류(일단은...상의가 더 필요한 부분)

        :param name: 제품이름
        ex: 해찬들 고추장

        :return cate1Name, cate1Img,  cate2Name, cate2Img
        '''
        cursor = self.db.cursor()

        sql = "select c1.classification1Name, c1.classification1Image, c2.classification2Name, c2.classification2Image " \
              "from Classification2 c2, Classification1 c1 " \
              "where %s like concat('%', c2.classification2Name, '%') and c1.c1ID = c2.Classification2to1;"

        cursor.execute(sql, name)
        result = cursor.fetchall()

        return result

    def add_UserProducts(self, data):
        '''
        제품을 추가 할때 사용 : 카테고리가 있다는 전제
        :param data: 2차원 리스트, 안에는 name, category1, category2, expDay, count가 있는 dict
        ex: [{item_name: 고추장, item_category1: 장류, ...}]
        item_name: 재료이름         item_category1: 대분류
        item_category2: 소분류      item_expDay: 재료 유통기한 (D-day식으로 표기 예정)        item_count: 재료 수량
        item_image: 제품이미지(소분류 이미지)

        :return 1: 성공 0: 실패
        '''

        cursor = self.db.cursor()
        now = datetime.datetime.now()
        now = now.strftime('%Y-%m-%d')
        for d in data:
            sql = "INSERT INTO UserProduct(productName, productCount, creadtedDate, productClassification1," \
                  " Classification2, productShelfLife, productImage, isDeleted) " \
                  "VALUES(%s, %s, %s, %s, %s, %s, %s, 0);"
            try:
                cursor.execute(sql, (d['item_name'], d['item_count'], now, d['item_category1'], d['item_category2'], d['item_expDay'], d['item_image']))
            except:
                print(d['name'] + "를(을) DB에 정상적으로 추가되지 못했습니다.")
                return 0

        return 1

    def get_UserProducts(self, user_id):
        '''
        제품을 보여줄 때 사용
        :param user_id: user의 id를 받아서 DB에 저장된 제품을 보여준다.

        :return data: 2차원리스트, 리스트 안에는 dict형
        ex: [{item_name: 고추장, item_category1: 장류, ...}...]
        item_name: 재료이름         item_category1: 대분류     item_createDay: 재료 등록일
        item_expDay: 재료 유통기한 (D-day식으로 표기 예정)        item_count: 재료 수량
        item_image
        '''
        data = []
        dict_keys = ['upID', 'item_name', 'item_count', 'item_createDay', 'item_category1', 'item_expDay', 'item_image']
        cursor = self.db.cursor()
        sql = "SELECT upID, productName, productCount, createdDate, productClassification1, productShelfLife, productImage " \
              "FROM UserProduct WHERE uID=%s;"
        cursor.execute(sql, user_id)
        result = cursor.fetchall()

        for r in result:
            tmp = dict()
            for d in range(5):
                tmp[dict_keys[d]] = r[d]
            data.append(tmp)

        return data

    def del_UserProducts(self, id):
        '''
        제품을 삭제함
        :param id: userproduct id

        :return 1:성공 0:실패
        '''
        cursor = self.db.cursor()
        try:
            sql = "DELETE FROM UserProduct WHERE upID=%s"
            cursor.execute(sql, id)
            return 1
        except:
            print("삭제에 실패 하였습니다.")
            return 0

    def set_UserProducts(self, type, data, ProductID):
        '''
        제품의 정보를 바꿔 줌
        :param type: 바꿀 DB column명(정확해야한다.)
        --> productName, productCount, productShelfLife, productClassification1 중에 하나

        :param data: 바뀌는 데이터: int여도 str이어도 상관없다.
        :param ProductID: 바꿀제품 id

        :return 1:성공 0:실패
        '''
        cursor = self.db.cursor()
        try:
            sql = "UPDATE UserProduct SET {}=%s WHERE upID=%s".format(type)
            cursor.execute(sql, (data, ProductID))
            return 1
        except:
            print("변경에 실패 하였습니다.")
            return 0

    def get_User(self):
        '''
        1
        :return:
        '''

        pass

    def search_recipe(self):
        '''
        2
        :return:
        '''
        pass

    def get_detail_recipe(self):
        '''
        3
        :return:
        '''
        pass

    def get_favo_reicpe(self):
        '''
        (4)
        :return:
        '''
        pass

    def del_favo_recipe(self):
        '''
        (4)
        :return:
        '''
        pass