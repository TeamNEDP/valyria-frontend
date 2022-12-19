
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from './Component/MainFeaturedPost';
import FeaturedPost from './Component/FeaturedPost';
import Main from './Component/Main';
import Sidebar from './Component/Sidebar';
import Footer from './Component/Footer';
// import post from './Component/post.md'
import { Toolbar, } from "@mui/material";

import edit from './Component/edit.svg'
import pk from './Component/pk.svg'

const featuredPosts = [
  {
    title: '编写脚本',
    detail: 'Script',
    description:
      '参考样例脚本，编写出属于你自己的最强脚本！',
    image: edit,
    imageLabel: 'Image Text',
    text: 'https://joky02.github.io'
  },
  {
    title: '开启排位赛',
    detail: 'Qualifying',
    description:
      "对战不同玩家，证明自己的实力！",
    image: pk,
    imageLabel: 'Image Text',
    text: '#/qualifying'
  },
];


const sidebar = {
  title: 'About',
  description:
    '这是一个大作业 by TeamNEDP',

  social: [
    { name: 'GitHub', icon: GitHubIcon, url: 'https://github.com/TeamNEDP?tab=repositories' },
    { name: 'Twitter', icon: TwitterIcon, url: '#' },
    { name: 'Facebook', icon: FacebookIcon, url: '#' },
  ],
};
const main = {
  archives: [
    { title: '现已支持排位赛功能。', url: '#' },

  ],
}
const theme = createTheme();

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Toolbar />
        <main>
          <MainFeaturedPost />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="公告" archives={main.archives} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />

          </Grid>
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}