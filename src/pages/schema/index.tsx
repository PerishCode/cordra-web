import React, { useEffect } from 'react'
import { Collapse } from 'antd'
import { connect } from 'umi'
import { namespace } from './model'
import { Icon } from '@/components'
import './index.sass'

export default connect(({ [namespace]: model }: any) => ({ model }))(Page)

const { Panel } = Collapse

function Page(props: any) {
  const { model: schemas, dispatch } = props

  useEffect(() => {
    dispatch({
      type: namespace + '/initialize',
    })
  }, [])

  function newPostClickHandler(e) {
    console.log(this, 'new post')

    e.stopPropagation()
  }

  function editClickHandler(e) {
    console.log(this, 'edit')

    e.stopPropagation()
  }

  return (
    <div className="page schema-all container">
      <Collapse>
        {Object.keys(schemas).map(k => (
          <Panel
            key={k}
            header={k}
            extra={
              <div>
                <Icon
                  type="iconcreatenewpost"
                  onClick={newPostClickHandler.bind(k)}
                />
                <Icon type="iconedit" onClick={editClickHandler.bind(k)} />
              </div>
            }
          >
            <pre>{JSON.stringify(schemas[k], null, 2)}</pre>
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}
