### ** * commitLog(key: string,params: { [key: string]: String }): Promise**
- 提交日志


### ** * commitChannelsLog(logType: "PayLog",params: PayLogParams): Promise**
- commitChannelsLog(logType: "PayLog",params: PayLogParams): Promise
- ***参数定义***

```typescript
type PayLogParams = {
	id: string
	price: number
	count: number
	currency: string
}

```

