import React from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TopBar from '../../layout/TopBar';
import BottomBar from '../../layout/BottomBar';
import FloatingActionButton from '../../layout/FloatingActionButton';

const Recipe = () => {
    return (
        <Container fixed>
            <TopBar />
            <Box>
                여기는 레시피 검색 및 담은 재료로 레시피를 만드는 페이지입니다.
            </Box>
            <FloatingActionButton />
            <BottomBar />
        </Container>
    )
}
export default Recipe;