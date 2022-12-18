import * as React from 'react';
import Title from './Title';
import { ScriptsState } from "@/state/user";
import { useRecoilValue } from 'recoil';
import Select from '@mui/material/Select';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { Grid } from '@mui/material'
import { get_competition, post_competition } from "@/api/battle_api";
import { useEffect } from 'react';
import useMessage from "@/hooks/useMessage";
import { useCallback } from 'react';
import { Container } from '@mui/system';
export default function Setting() {
    const scripts = useRecoilValue(ScriptsState);
    const [, { addMessage }] = useMessage();
    const [involved, setInvolved] = useState(false);
    const [, setScriptName] = useState('');
    const [name, setName] = useState('');
    useEffect(() => {
        (async () => {
            try {
                const [CompetitionStatus] = await Promise.all([
                    get_competition(),
                ]);

                setInvolved(CompetitionStatus.data.involved);
                setScriptName(CompetitionStatus.data.scriptName);
                if(name === '') setName(CompetitionStatus.data.scriptName);
            } catch (e) {
            } finally {
            }
        })();
    });
    const handClick = () => {
        (async () => {
            try {
                if(involved) {
                    await post_competition(null);
                }else {
                    console.log(name);
                    await post_competition(name);
                }
                
                addMessage("success", "成功")
            } catch (e) {
                addMessage("error", "失败");
            } finally {
            }
        })();
    }
    return (
        <React.Fragment>
            <Title>{involved ? '已参与排位' : '未参与排位'}</Title>
            <Grid container justifyContent="center" >
                <Grid item md={2}><h4>脚本:</h4></Grid>
                <Grid item md={9}>
                    <Select
                        displayEmpty
                        disabled={involved}
                        id="Bscript"
                        value={name}
                        sx={{ m: 1, minWidth: 250 }}
                        onChange={(e) => { setName(e.target.value); }}
                    >{scripts.map((script) => (
                        <MenuItem key={script.name} value={script.name}>
                            {script.name}
                        </MenuItem >
                    ))}
                    </Select>
                </Grid>
            </Grid >
            <Grid><br/></Grid>
            <Container maxWidth="sm" align = "center" justify = "center">
                <Button onClick={handClick}>{involved ? '退出排位' : '参与排位'}</Button>
            </Container>


        </React.Fragment >
    );
}