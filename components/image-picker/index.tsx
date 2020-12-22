import React from "react"
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { WithTheme, WithThemeStyles } from "../style"
import { CameraRollPickerProps } from "./CameraRollPicker"
import ImageRoll, { ImageRollTexts } from "./ImageRoll"
import { ImagePickerPropTypes } from "./PropsType"
import ImagePickerStyles, { ImagePickerStyle } from "./style/index"

export interface ImagePickerProps extends ImagePickerPropTypes, WithThemeStyles<ImagePickerStyle>, ImageRollTexts {
  cameraPickerProps?: CameraRollPickerProps
  assetType?: "Photos" | "Videos" | "All"
  renderAddBtn?: () => React.ReactNode
}

export default class ImagePicker extends React.Component<ImagePickerProps, any> {
  static defaultProps = {
    onChange() {},
    onFail() {},
    files: [],
    selectable: true,
  }

  plusText: any
  plusWrap: any

  constructor(props: ImagePickerProps) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  onPressIn = (styles: ReturnType<typeof ImagePickerStyles>) => () => {
    this.plusWrap.setNativeProps({
      style: [styles.item, styles.size, styles.plusWrapHighlight],
    })
  }

  onPressOut = (styles: ReturnType<typeof ImagePickerStyles>) => () => {
    this.plusWrap.setNativeProps({
      style: [styles.item, styles.size, styles.plusWrapNormal],
    })
  }

  showPicker = () => {
    if (this.props.onAddImageClick) {
      this.props.onAddImageClick()
      return
    }
    this.setState({
      visible: true,
    })
  }

  addImage(imageObj: any) {
    if (!imageObj.url) {
      imageObj.url = imageObj.uri
      delete imageObj.uri
    }
    const { files = [] } = this.props
    const newImages = files.concat(imageObj)
    if (this.props.onChange) {
      this.props.onChange(newImages, "add")
    }
  }

  removeImage(idx: number): void {
    const newImages: any[] = []
    const { files = [] } = this.props
    files.forEach((image, index) => {
      if (index !== idx) {
        newImages.push(image)
      }
    })
    if (this.props.onChange) {
      this.props.onChange(newImages, "remove", idx)
    }
  }

  hideImageRoll = () => {
    this.setState({
      visible: false,
    })
    if (this.props.onFail) {
      this.props.onFail("cancel image selection")
    }
  }

  onImageClick(index: number) {
    if (this.props.onImageClick) {
      this.props.onImageClick(index, this.props.files)
    }
  }

  getTxt = () => {
    const { cameraPickerProps, assetType } = this.props
    let sourceType = assetType || (cameraPickerProps && cameraPickerProps.assetType)
    switch (sourceType) {
      case "Videos":
        return "添加视频"
      case "Photos":
        return "添加图片"
      case "All":
        return "添加图片/视频"
      default:
        return ""
    }
  }

  render() {
    const { files = [], selectable, cameraPickerProps, assetType, renderAddBtn } = this.props
    return (
      <WithTheme styles={this.props.styles} themeStyles={ImagePickerStyles}>
        {(styles) => {
          const filesView = files.map((item: any, index) => (
            <View key={index} style={[styles.item, styles.size]}>
              <TouchableOpacity onPress={() => this.onImageClick(index)} activeOpacity={0.6}>
                <Image source={{ uri: item.url }} style={[styles.size, styles.image]} />
                {item.videoUrl && <Image source={require("../../images/play.png")} style={styles.play} />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.removeImage(index)} style={styles.closeWrap} activeOpacity={0.6}>
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>
            </View>
          ))

          const imageRollEl = (
            <ImageRoll
              onCancel={this.hideImageRoll}
              onSelected={(imgObj) => this.addImage(imgObj)}
              title={this.props.title}
              cancelText={this.props.cancelText}
              cameraPickerProps={cameraPickerProps}
            />
          )
          return (
            <View style={styles.container}>
              {filesView}
              {selectable && (
                <TouchableWithoutFeedback
                  onPress={this.showPicker}
                  onPressIn={this.onPressIn(styles)}
                  onPressOut={this.onPressOut(styles)}
                >
                  <View
                    ref={(conponent: any) => (this.plusWrap = conponent)}
                    style={[styles.item, styles.size, styles.plusWrap, styles.plusWrapNormal]}
                  >
                    {renderAddBtn && renderAddBtn()}
                    {!renderAddBtn && (
                      <Image
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                        source={
                          assetType === "Videos"
                            ? require("../../images/video.png")
                            : require("../../images/camera.png")
                        }
                      />
                    )}
                    {!renderAddBtn && <Text style={[styles.plusText]}>{this.getTxt()}</Text>}
                  </View>
                </TouchableWithoutFeedback>
              )}
              {this.state.visible ? imageRollEl : null}
            </View>
          )
        }}
      </WithTheme>
    )
  }
}
