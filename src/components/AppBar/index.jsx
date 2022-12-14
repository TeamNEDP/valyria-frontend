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
import { UserInfoState, LoadingUserInfoState, ScriptsState } from '@/state/user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { logout } from "@/api/login_api";

function AppBarButton(param) {
  return (
    <Button color="inherit" component={Link} to={param.to} size="large" onClick={param.onClick}
      sx={{
        display: { xs: param.displayInXS ? 'flex' : 'none', md: 'flex' },
        fontFamily: 'Sans-serif',
        fontWeight: 500,
        color: 'inherit',
        marginLeft: param.rightSide ? "auto" : 0
      }}
    >{param.content}</Button>
  )
}
function AppBarButton2(param) {
  return (
    <Button href="https://joky02.github.io/" component="a" color="inherit" size="large" onClick={param.onClick}
      sx={{
        display: { xs: param.displayInXS ? 'flex' : 'none', md: 'flex' },
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
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState);
  const setUserScripts = useSetRecoilState(ScriptsState);
  const [loading] = useRecoilState(LoadingUserInfoState);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await logout();
    setUserInfo(null);
    setUserScripts([]);
    handleClose();
  };

  return (
    <AppBar position="fixed" sx={{ height: 64 }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
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
        <AppBarButton content="??????" to="/" displayInXS={true} />
        <AppBarButton content="????????????" to="/contest" displayInXS={true} />
        <AppBarButton2 content="????????????" />
        <AppBarButton content="?????????" to="/rank" displayInXS={true} />
        <AppBarButton content="?????????" to="/qualifying" displayInXS={true} />
        {loading ? <></> : (userInfo === null ?
          <AppBarButton content="?????? / ??????" rightSide to="/login" displayInXS={true} />
          :
          <AppBarButton content={userInfo.data.name} rightSide onClick={handleClick} displayInXS={true} />
        )}
      </Toolbar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => { navigate("/profile"); handleClose(); }}>????????????</MenuItem>
        <MenuItem onClick={() => { navigate("/scripts"); handleClose(); }}>????????????</MenuItem>
        <MenuItem onClick={handleLogout}>??????</MenuItem>
      </Menu>
    </AppBar>
  );
}
export default SiteAppBar;
