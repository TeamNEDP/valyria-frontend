import * as React from 'react';
import { 
  AppBar,
  Typography,
  Toolbar,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

function AppBarButton(param) {
  return (
    <Button color="inherit" component={Link} to={param.to} size="large"
      sx = {{ 
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'Sans-serif',
        fontWeight: 500,
        color: 'inherit',
        marginLeft: param.rightSide ? "auto" : 0
      }}
    >{param.content}</Button>
  )
}

function SiteAppBar() {
  const navigate = useNavigate();
  return (
    <AppBar position = "relative" sx = {{ zIndex: "10" }}>
      <Toolbar>
        <Typography
          variant = "h6"
          noWrap
          component = "a"
          href = "/"
          sx = {{
            mr: 6,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 1000,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
          onClick={() => { navigate("/"); }}
        >
          Valyria
        </Typography>
        <></>
        <AppBarButton content="主页" to="/"/>
        <AppBarButton content="赛事大厅" to="/contest"/>
        <AppBarButton content="排行榜" to="/rank"/>
        <AppBarButton content="历史记录" to="history"/>
        <AppBarButton content="战斗页面（开发者入口）" to="/battle"/>
        <AppBarButton content="登录 / 注册" rightSide to="/login"/>
      </Toolbar>
    </AppBar>
  );
}
export default SiteAppBar;
