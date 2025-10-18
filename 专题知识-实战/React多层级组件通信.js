多层组件通信，表格中的输入框触发外层弹框
表格元素，修改输入框，通过请求返回数据判断是否要弹框，弹框确认后触发提交

子组件里EditTextareaForm

props: specialWarningsRef, submitValidate,

函数handleSubmit里：
 async function handleSubmit() {
        if (checkingPromiseRef.current?.then) {
            const hasError = await checkingPromiseRef.current;
            checkingPromiseRef.current = null;
            if (hasError) return;
        }
        const useHooks = formRef?.current?.useHooks;
        if (!useHooks) return;
        const errorMap = errorsOrWarnings?.errorsList;
        const hasError = Object.values(errorMap).find((item) => item && item?.length);
        if (hasError) return;
        submitValidate && submitValidate(async () => {
            const { getFieldsValue } = useHooks();
            const formData = getFieldsValue();
            console.log('formData', formData);
            setLoading(true);
            await onSubmit(formData);
            setLoading(false);
        });
    }


函数onFormChange里
 const res = await checkText(params);
                const { errMsg, data: responseData } = res;
                if (!errMsg) {
                    data = responseData;
                    specialWarningsRef.current = responseData?.specialWarnings;
                } else {
                    Toast.open({ children: errMsg, status: 'fail' });
                }


父组件：
const specialWarningsRef = useRef<any>(null);
<EditableCell
submitValidate={confirmSubmit}
 specialWarningsRef={specialWarningsRef}
FormComponent={EditTextareaForm}



函数confirmSubmit里
 const confirmSubmit = async (fn: (params?: any) => void) => {
        const specialWarnings = specialWarningsRef.current.filter((item) => item?.isActiveKey);
        if (specialWarnings?.length > 0) {
            const model = Modal.confirm({
                title: String(i18nClient.t('i18n_platform_front_onlineChangeTipsTitle', {
                    defaultValue: '线上变量修改提醒',
                })),
                children: (
                    <>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Icon
                                name="icon-alert"
                                size={40}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                <div style={{ color: 'red', overflowWrap: 'break-word' }}>
                                    {specialWarnings?.map((item) => (
                                        item.key
                                    )).join('、')}
                                    {String(i18nClient.t('i18n_platform_front_onlineChangeTipsDetails', {
                                        defaultValue: '被检测为线上活跃key，直接修改占位符可能会导致占位符被明文展示，请谨慎操作。',
                                    }))}
                                </div>
                                <div>
                                    {String(i18nClient.t('i18n_platform_front_onlineChangeTipsContent', {
                                        defaultValue: '线上活跃Key修改占位符，建议',
                                    }))}
                                    <span style={{ color: 'red' }}>
                                        {String(i18nClient.t('i18n_platform_front_onlineChangeTipsAction', {
                                            defaultValue: '新建Key，并和RD沟通修改',
                                        }))}
                                    </span>

                                </div>
                            </div>
                        </div>
                    </>
                ),
                onConfirm: async () => {
                    model.update({
                        confirmButtonProps: {
                            loading: true,
                        },
                    });
                    await fn();
                    model.update({
                        confirmButtonProps: {
                            loading: false,
                        },
                    });
                    setChangeTipsModalVisible(false);
                    specialWarningsRef.current = null;
                    return true;
                },
                onCancel: () => {
                    setChangeTipsModalVisible(false);
                },
            });
        } else {
            fn();
        }
    };