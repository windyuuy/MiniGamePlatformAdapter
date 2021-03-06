
namespace GDK {
	/** 按钮的样式 */
	export class UserInfoButtonStyle {
		left?: number//		是	左上角横坐标	
		top?: number//		是	左上角纵坐标	
		width?: number//		是	宽度	
		height?: number//		是	高度	
		backgroundColor?: string//		是	背景颜色	
		borderColor?: string//		是	边框颜色	
		borderWidth?: number//		是	边框宽度	
		borderRadius?: number//		是	边框圆角	
		textAlign?: "left" | "center" | "right"//		是	文本的水平居中方式	
		fontSize?: number//		是	字号	
		lineHeight?: number//		是	文本的行高
	}

	export interface UserInfoButton {
		text: string //按钮上的文本，仅当 type 为 text 时有效
		image: string //按钮的背景图片，仅当 type 为 image 时有效
		style: UserInfoButtonStyle

		//显示用户信息按钮
		show()

		//隐藏用户信息按钮
		hide()

		//销毁用户信息按钮
		destroy()

		//监听用户信息按钮点击事件
		onTap(callback: Function)

		//取消监听用户信息按钮点击事件
		offTap(callback: Function)

		//显示用户信息按钮
		show()

		//隐藏用户信息按钮
		hide()

		//销毁用户信息按钮
		destroy()
	}
	export interface IUserInfoButton {
		/**
		 * 按钮的类型
		 * @param "text" 可以设置背景色和文本的按钮
		 * @param "image" 只能设置背景贴图的按钮，背景贴图会直接拉伸到按钮的宽高
		 */
		type: "text" | "image",
		/** 按钮上的文本，仅当 type 为 text 时有效 */
		text?: string,
		/** 按钮的背景图片，仅当 type 为 image 时有效 */
		image?: string,
		/** 按钮的样式 */
		style: UserInfoButtonStyle
	}

	/** 鉴权相关 */
	export interface IAuth {

		/**
		 * 创建用户信息授权按钮
		 * * 当前仅微信有效
		 */
		createUserInfoButton(obj: IUserInfoButton): UserInfoButton | null

		/**
		 * 判断是否拥有获取用户信息的权限
		 */
		isUserInfoAuthAlready(): Promise<boolean>
	}
}
