import pymysql
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

    def Get_Classifi1_To_Classifi2(self, classifi1_category):
        '''
        item_name : 재료 이름
        '''

        cursor = self.db.cursor()
        sql = "SELECT c2.Classification2Name, c2.Classification2Image  FROM Classification2 c2, Classification1 c1 " \
              "WHERE c1.classification1Name = %s and c2.Classification2to1 = c1.c1ID;"

        cursor.execute(sql, classifi1_category)
        result = cursor.fetchall()
        return result

    def add_UserProducts(self, data):
        #
        cursor = self.db.cursor()
        sql = "INSERT INTO UserProduct(recipeName, recipeIntroduce, recipeAmount, recipeImage, recipeTime) " \
              "VALUES(%s, %s, %s, %s, %s);"

    def get_UserProducts(self, barcode_num):
        cursor = self.db.cursor()
        sql = "SELECT recipeName FROM Recipe WHERE recipeName=%s;"
        # cursor.execute(title_sql, title)
        result = cursor.fetchall()

        return

    def del_Userproducts(self, id):
        return 1


db = DB()
print(db.Get_Classifi1_To_Classifi2(classifi1_category='육류'))