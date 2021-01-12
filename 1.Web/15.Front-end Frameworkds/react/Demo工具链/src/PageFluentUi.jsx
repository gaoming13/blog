import React from 'react';
import { Depths, SharedColors } from '@fluentui/theme';
import { DefaultButton, PrimaryButton, Stack } from '@fluentui/react'
import { initializeIcons } from '@uifabric/icons'

initializeIcons();

function bindClick() {
  alert('1213');
}

export default class PlageFluentUi extends React.Component {
  render() {
    return <div style={{ boxShadow: Depths.depth8, color: SharedColors.blue10 }}>
      <Stack horizontal tokens={{ childrenGap: 40 }}>
        <DefaultButton menuProps={{
          items: [
            {
              key: 'a1',
              text: '新建',
              iconProps: { iconName: 'Mail' },
            },
          ],
        }} secondaryText="这是内容2了" onClick={ bindClick }>DefaultButton</DefaultButton>
        <PrimaryButton iconProps={{ iconName: 'Mail' }} text="PrimaryButton" />
      </Stack>
      <a>
        <i>哈哈哈</i>
      </a>
      <div>aaa</div>
    </div>
  }
}