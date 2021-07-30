### SSAFY-WEB

###

#### 스켈레톤

```
React를 사용하여 냉장고 내 물품을 쉽게 보여주기 및 관리를 하며,
이를 활용한 레시피를 추천해주는 서비스
```

#### directory

```
/public
	/images
	-Vo_icon.png
-favicon.ico
-index.html
-logo192.png
-logo512.png
-manifest.json
-index.html
```

```
/src
	/common
	- CommonHooks.jsx                -> key press, local storage state
	- InfiniteScroll.jsx             -> handle infinite scroll
	- MediaQueryHooks.jsx            -> material-ui useMediaQuery hooks

	/components
		/Auth
			/SignResponsiveDialog        -> sigin in, sigin up, recover pw
		/Create
			/CreateVoteComponent         -> create a vote
			/DialogActionsComponet       -> create a vote
			/RadioButtonsGroup           -> create a vote
		/Feed                            -> vote feed
		/Grid
			/VoteGridItem                -> vote item
			/VoteGridList                -> vote root
			/VoteGridTitle               -> vote title
		/Main
			/ButtonBases                 -> category head
			/CheckBoxButtonsGroup        -> vote options
			/HorizontalBar               -> perceantage chart
			/VoteDetailResponsiveDialog  -> vote result
		/Search
			/SearchComponent             -> search vote
		/User
			/ChangePassword              -> change pw
			/MyInfo                      -> user info
			/UserResponsiveDialog        -> user dialog root
			/VerticalTabs                -> user dialog side nav

	/context                         -> create context

	/css                             -> reset css

	/layout
		/Drawer                        -> side nav
		/Footer                        -> footer
		/Header                        -> head nav
		/Layout                        -> layout root

	/pages
	- Auth                       -> user
	- AboutMe                    -> about me
	- ContactUs                  -> contact us
	- CreateVote                 -> create vote
	- MainVote                   -> vote
	- MyVote                     -> my vote
	- NotFound                   -> 404 page
	- SearchVote                 -> search
	- Terms                 	 -> terms
```

```
App.js
```

```
index.css
```

```
index.js
```

```
serviceWorker.js
```

```
package.json
```

```
README.md
```

#### run

```
npm install
npm start
```
