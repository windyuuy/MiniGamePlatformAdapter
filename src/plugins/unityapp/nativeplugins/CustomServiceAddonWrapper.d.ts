
declare namespace CS.Glee.Bridge {
   export class CustomServiceAddonWrapper {

        public OpenConversation (info: OpenConversationInfo, callbacks: TaskCallback<OpenConversationResult>):void;

    }

   export class OpenConversationInfo {
       public userName!: string;
       public userId!: string;
   }

   export class OpenConversationResult {
   }

}
