import { Configuration, OpenAIApi } from 'openai-edge'

export class OpenAIService {
  private static openAIApi: OpenAIApi

  public static getInstance(): OpenAIApi {
    if (!OpenAIService.openAIApi) {
      OpenAIService.openAIApi = new OpenAIApi(
        new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        })
      )
    }

    return OpenAIService.openAIApi
  }
}
