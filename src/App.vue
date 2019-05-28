<template>
    <Layout>
        <Header class="header">
            <Button @click="clear" type='error'>
                清空
            </Button>
            <Button @click="getComp" type='primary'>
                获取当前页面配置
            </Button>
           <Button @click="showPageModal = true" type='success'>
                添加新页面
            </Button>
            <Select prefix="ios-home" style="width:200px"
                placeholder='请选择编辑页面'
                @on-change='pageChange'
                :value='defaultName'
            >
                <Option v-for="(item, i) in pageList" :value="item" :key="i">
                    {{ item }}
                </Option>
            </Select>
        </Header>
        <Content>
            <Row>
                <Col span="8">
                    <Divider>
                        <Tag color="geekblue">
                            控件库
                        </Tag>
                    </Divider>
                    <ModuleView />
                </Col>
                <Col span="8">
                    <Divider>
                        <Tag color="volcano" @click.native='openPageEditor'>
                            当前页面：{{currentPage.name}}
                        </Tag>
                    </Divider>
                    <EditView />
                </Col>
                <Col span="8">
                    <Divider>
                        <Tag color="cyan">
                            编辑区域
                        </Tag>
                    </Divider>
                    <PropChangeView />
                    <Divider />
                    <Row>
                        <Col offset='9'>
                            <!-- <Button>
                                提交发布
                            </Button> -->
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Content>
        <Modal
            v-model="showModal"
            title="页面配置"
            @on-ok="showModal = false"
            @on-cancel="showModal = false"
        >
            <pre>{{JSON.stringify($store.state.pageData, null, 4)}}</pre>
        </Modal>
        <Modal
            v-model="showPageModal"
            title="添加页面"
            @on-ok="addPage"
            @on-cancel="showPageModal = false">
            <Form>
                <FormItem label="页面名称">
                    <Input v-model="form.name" placeholder="请输入页面名称"></Input>
                </FormItem>
                <FormItem label="页面路径">
                    <Input v-model="form.path" placeholder="请输入页面路径"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal
            v-model='showPageEditorModal'
            title="页面编辑"
            >
            <Tag type="dot" 
                v-for='(item, i) of pageData' 
                :key="i"
                :closable='!(item.name === "主页" && item.path === "/")'
                :color='item.name === currentPage.name ? "primary" : ""'
                :name='item.name'
                @click.native='pageChange(item.name)'
                @on-close='deletePage'
                >
                {{item.name}}
            </Tag>
        </Modal>
    </Layout>
</template>


<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import EditView from './views/EditView/index.vue';
import ModuleView from './views/ModuleView/index.vue';
import PropChangeView from './views/PropChangeView/index.vue';
import { State, Getter, Mutation } from 'vuex-class';
import { Page } from './interface';
import { SET_ACTIVEPAGEINDEX, ADD_PAGE, DEL_PAGE } from './store/constants';

@Component({
    components: {
		EditView,
        ModuleView,
        PropChangeView
    }
})
export default class App extends Vue {
    @Getter currentPage!: Page;
    @State pageData!: Page[]
    @State activePageIndex!: number;
    showModal = false;
    showPageModal = false;
    showPageEditorModal = false;
    form: { [key: string]: any } = {
        name: '',
        path: ''
    }

    get pageList() {
        return this.pageData.map(page => page.name);
    }

    get defaultName() {
        return this.pageData[this.activePageIndex].name
    }

    @Mutation SET_ACTIVEPAGEINDEX!: Function
    @Mutation ADD_PAGE!: Function
    @Mutation DEL_PAGE!: Function

    openPageEditor() {
        this.showPageEditorModal = true;
    }
    clear() {
        sessionStorage.clear();
        window.location.reload()
    }
    addPage() {
        const { name } = this.form,
            pageNameList = this.pageData.map(page => page.name);
        if(pageNameList.includes(name)) {
            return this.$Notice.error({
                title: "添加失败",
                desc: "页面名称已存在"
            })
        }
        this.ADD_PAGE(Object.assign({}, this.form, {componentList: []}))
    }
    deletePage(event: any, name: string) {
        const index = this.pageData.findIndex(page => page.name === name);
        console.log(DEL_PAGE);
        this.DEL_PAGE(index);
    }
    pageChange(val: string) {
        const index = this.pageData.findIndex(page => page.name === val);
        this.SET_ACTIVEPAGEINDEX(index);
    }
    getComp() {
        this.showModal = true;
    }
 }
</script>

<style lang="stylus" scoped>
button
    margin-right 10px
.ivu-layout {
    background-color: #eceef3!important;
}
.header
    text-align center
.ivu-layout-content {
    position: relative;
    width: 1256px;
    margin: 0 auto 0;
    padding: 20px 0
    /* background-color: #eceef3; */
}
</style>

