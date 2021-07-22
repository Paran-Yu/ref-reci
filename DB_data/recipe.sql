SELECT * FROM refrigerator.recipe;

-- 레시피의 이름, 인분, 이미지, 요약본, 요리시간을 제공한다 (전체 컬럼 제공)
-- test data: 닭 혹은 대파가 들어간 레시피 --> 닭 or 대파
SELECT r.rID, r.recipeName, r.recipeIntroduce, r.recipeAmount, r.recipeImage, r.recipeTime, iID, count(*)
FROM recipe r, recipeingredient  i
WHERE r.rID = i.rID and i.iID in (select iID from ingredient where ingredientName in ('닭', '대파'))
group by r.rID
order by count(*) DESC; -- 재료 많이 겹치는 순서로 보여줌

-- 레시피를 선택하면 레시피 단계별 설명과 이미지를 제공한다.
-- test data: rID 6번은 한방 삼계탕 레시피
select fdID, recipephaseIntroduce, recipephaseImage from recipephase where rID=6;

-- 유저 즐겨찾기 기능
-- test data: 1번유저, 6번 레시피
-- 추가
INSERT INTO favorites(uID, rID) values (1, 6);
-- 삭제
DELETE FROM favorites WHERE rID=6;
-- 조회
SELECT rID FROM favorites WHERE uID=1;