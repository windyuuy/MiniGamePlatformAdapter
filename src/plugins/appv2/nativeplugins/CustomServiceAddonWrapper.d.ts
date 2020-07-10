
declare namespace CS.Glee.Bridge {
   export class CustomServiceAddonWrapper {

        public OpenConversation (info: OpenConversationInfo, callbacks: TaskCallback<OpenConversationResult>):void;

    }

   export class OpenConversationInfo {
       public userId!: string;
       public userName!: string;
   }

   export class OpenConversationResult {
   }

}
