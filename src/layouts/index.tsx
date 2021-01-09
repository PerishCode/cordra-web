import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { history } from 'umi'
import { Icon } from '@/components'
import './index.sass'

const { Sider, Content } = Layout
const { SubMenu } = Menu

export default function ({ children }) {
  const [collapse, setCollapse] = useState(true)

  return (
    <Layout>
      <Sider
        collapsible
        trigger={null}
        collapsed={collapse}
        width="170px"
        collapsedWidth="50px"
      >
        <div className="logo" onClick={() => setCollapse(!collapse)}>
          <Icon type="icongem" />
          <span className="text">DB Manager</span>
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
          <Menu.Item
            key="Author"
            icon={<Icon type="iconauthor" />}
            onClick={() => history.push('/author')}
          >
            作者管理
          </Menu.Item>
          <Menu.Item
            key="Paper"
            icon={<Icon type="iconpaper" />}
            onClick={() => history.push('/paper')}
          >
            论文管理
          </Menu.Item>
          <Menu.Item
            key="Schema"
            icon={<Icon type="iconschema" />}
            onClick={() => history.push('/schema')}
          >
            Schema管理
          </Menu.Item>
          <Menu.Item
            key="Object"
            icon={<Icon type="iconobject" />}
            onClick={() => history.push('/object')}
          >
            数字对象管理
          </Menu.Item>

          {/* <SubMenu key="sub1" icon={<Icon type="iconedit" />} title="Author">
            <Menu.Item key="1" icon={<Icon type="iconedit" />}>
              Search
            </Menu.Item>
            <Menu.Item key="2" icon={<Icon type="iconedit" />}>
              
            </Menu.Item>
            <Menu.Item key="3" icon={<Icon type="iconedit" />}>
              option3
            </Menu.Item>
            <Menu.Item key="4" icon={<Icon type="iconedit" />}>
              option4
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<Icon type="iconedit" />} title="subnav 2">
            <Menu.Item key="5" icon={<Icon type="iconedit" />}>
              
            </Menu.Item>
            <Menu.Item key="6" icon={<Icon type="iconedit" />}>
              option6
            </Menu.Item>
            <Menu.Item key="7" icon={<Icon type="iconedit" />}>
              option7
            </Menu.Item>
            <Menu.Item key="8" icon={<Icon type="iconedit" />}>
              option8
            </Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
      <Content>{children}</Content>
    </Layout>

    // <div className="layout">
    //   <div className="navigator">
    //     {/* <Icon type="iconedit" onClick={() => history.push('/schema')} />
    //     <Icon type="iconedit" onClick={() => history.push('/object')} /> */}
    //     <div className="option" onClick={() => history.push('/schema')}>
    //       S
    //     </div>
    //     <div className="option" onClick={() => history.push('/object')}>
    //       O
    //     </div>
    //   </div>
    //   <div className="content">{children}</div>
    // </div>
  )
}
