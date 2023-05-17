// 音乐列表组件
import React from 'react';
import { useDispatch } from 'react-redux';
import { List } from 'antd-mobile';
import { VipOne } from '@icon-park/react';
import { setList } from '../../redux/play';

export default function ListView(props) {
  const dispatch = useDispatch();

  const playMusic = item => {
    const index = props.list.findIndex(a => a.id == item.id);
    dispatch(setList({ list: props.list, type: 1, index: index }));
  };

  return (
    <div>
      <List className="mt-2 flex-1 overflow-auto">
        {props.list?.map(item => (
          <List.Item key={item.id} onClick={() => playMusic(item)}>
            <div>
              {item.name} {item.fee == 1 && <VipOne theme="outline" size="16" fill="#f00" />}
            </div>
            <div className="text-sm line-clamp-1">
              {item.ar.map(a => a.name).join('，')}
              {item.alia[0] && ` - ${item.alia[0]}`}
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
