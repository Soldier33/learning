public onSave() {
    const params = this.checkParams()
    if (params) {
      const elementToCapture = document.getElementsByClassName('ucd-editZone-canvasWrapper');
      // 使用 html2canvas 将元素转换为 Canvas
      html2canvas(elementToCapture[0] as any).then(async (canvas) => {
        // 将 Canvas 转换为图片的数据 URL
        const imageDataURL = canvas.toDataURL('image/png');
        // 创建 FormData 对象
        const formData = new FormData();
        formData.append('image', imageDataURL)
        Object.keys(params).forEach((key) => {
          formData.append(key, params[key])
        })
        const ret = await this.save(formData);
        console.log(ret)
        if (ret) {
          this.$message.success('保存成功')
          this.onCancel()
        } else {
          this.templateName.errorMsg = '模板名已存在！';
          this.$message.error('保存失败')
        }
      })
    }
  }