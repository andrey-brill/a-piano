
import { ABundle, Chunk } from 'a-bundle';
import { CHUNK_NAME } from '../../@src/chunk-name.js';


const AChunk = Chunk.fromUmd(window.Modules);

ABundle.put(CHUNK_NAME, AChunk);

export { AChunk };