
import { bool } from './_types'

/**
 * This matcher trains [cv::flann::Index](#d1/db2/classcv_1_1flann_1_1Index}) on a train descriptor collection and calls its nearest search methods to find the best matches. So, this matcher may be faster when matching a large train collection than the brute force matcher. [FlannBasedMatcher](#dc/de2/classcv_1_1FlannBasedMatcher}) does not support masking permissible matches of descriptor sets because [flann::Index](#d1/db2/classcv_1_1flann_1_1Index}) does not support this. :
 * 
 * Source: [opencv2/features2d.hpp](https://github.com/opencv/opencv/tree/master/modules/core/include/opencv2/features2d.hpp#L1187).
 * 
 */
export declare class FlannBasedMatcher {

  /**
   *   
   *   @param indexParams 
   *   @param searchParams 
   */
  public constructor(indexParams: any, searchParams: any)

  /**
   *   If the collection is not empty, the new descriptors are added to existing train descriptors.
   *   
   *   @param descriptors Descriptors to add. Each descriptors[i] is a set of descriptors from the same train image.
   */
  public add(descriptors: any): any

  /**
   *   
   */
  public clear(): void

  /**
   *   
   *   @param emptyTrainData If emptyTrainData is false, the method creates a deep copy of the object, that is, copies both parameters and train data. If emptyTrainData is true, the method creates an object copy with the current parameters but with empty train data.
   */
  public clone(emptyTrainData: bool): any

  /**
   *   
   */
  public isMaskSupported(): bool

  /**
   *   
   *   @param fn 
   */
  public read(fn: any): any

  /**
   *   Trains a descriptor matcher (for example, the flann index). In all methods to match, the method [train()](#dc/de2/classcv_1_1FlannBasedMatcher_1a4fc9f506ff3185caa168b937c4e71080}) is run every time before matching. Some descriptor matchers (for example, BruteForceMatcher) have an empty implementation of this method. Other matchers really train their inner structures (for example, [FlannBasedMatcher](#dc/de2/classcv_1_1FlannBasedMatcher}) trains [flann::Index](#d1/db2/classcv_1_1flann_1_1Index}) ).
   *   
   */
  public train(): void

  /**
   *   
   *   @param fs 
   */
  public write(fs: any): any

  /**
   *   
   */
  public static create(): any
}

