
namespace TestGDK {
	export class TestResult {
		succeed: boolean = true
		reason: string = "succeed"
		detail?: string = ""
	}
	export interface ITest {
		api: GDK.UserAPI

		main(): Promise<TestResult>
	}
}