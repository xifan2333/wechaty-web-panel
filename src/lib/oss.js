import OSS from 'ali-oss';
import {allConfig} from '../db/configDb.js';

async function initStore() {
    const config = await allConfig()
    const ossConfig = config.conversationRecord && config.conversationRecord.ossConfig
    const options = {
        region: ossConfig.region,
        accessKeyId: ossConfig.aliAkId,
        accessKeySecret: ossConfig.aliAkSecret,
        bucket: ossConfig.bucket
    }
    if(ossConfig.custom_domain) {
        options.endpoint = ossConfig.custom_domain
    }
    const store = new OSS(options);
    return store
}


export async function uploadOssFile(file) {
    const store = initStore()
    const result = await store.put(file.name, file);
    return result
}