import Vue from 'vue'
import { Form, FormItem, Button, Input, Container, Header, Menu, Submenu, MenuItem, Card, Row, Col, Table, TableColumn, Dialog, MessageBox } from 'element-ui'
import { Message, Select, Option, Alert, Radio , ButtonGroup} from 'element-ui'
Vue.use(ButtonGroup)
Vue.use(Radio)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Alert)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm