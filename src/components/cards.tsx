import React from 'react';
import { Card, Col, Row, Button } from 'antd';



const cards: React.FC = () => (
  <Row gutter={16}>
    <Col span={8}>
      <Card title="Usuarios" bordered={false}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod ullam veniam quas mollitia eligendi unde consequatur! Totam, eos, reprehenderit debitis quaerat tempora, exercitationem qui ex eligendi fugiat maiores et minus!
        Ipsum deserunt deleniti labore nobis doloremque, qui, dolorem nam exercitationem assumenda commodi enim ratione fuga voluptate voluptatibus est, vel ex tempora veniam rem itaque eaque officiis. Accusamus eum explicabo minus?
      </Card>
      <Button type="primary" block>ver</Button>
    </Col>

    <Col span={8}>
      <Card title="Asignaturas" bordered={false}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolorum est quo quae optio eos eius veritatis saepe eligendi consectetur recusandae officia maxime id possimus accusamus, labore tempora culpa omnis.
        Provident ullam aut eius, a velit assumenda. Adipisci accusantium sint, iste magnam dicta eos ut ipsum voluptas possimus beatae hic sequi explicabo perferendis eum dignissimos ab ducimus eius. Nemo, ipsa.
      </Card>
     <Button type="primary" block>ver</Button>
    </Col>

    <Col span={8}>
      <Card title="valoraciones" bordered={false}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi, quo minus sequi excepturi, facilis autem ea doloremque at fugit nulla expedita eos rerum eaque, reprehenderit ipsa hic perferendis saepe facere!
        Dicta ipsa doloribus molestias vitae autem cumque impedit natus inventore libero repudiandae porro, quasi iusto nihil recusandae neque ducimus saepe odit harum expedita, sit architecto odio sunt quae delectus. Suscipit?
      </Card>
     <Button type="primary" block>ver</Button>
    </Col>
  </Row>
);

export default cards;