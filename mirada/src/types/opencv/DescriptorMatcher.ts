
import { bool, int, float, MatcherType } from './_types'

/**
 * It has two groups of match methods: for matching descriptors of an image with another image or with
 * an image set.
 * 
 * Source:
 * [opencv2/features2d.hpp](https://github.com/opencv/opencv/tree/master/modules/core/include/opencv2/f
 * eatures2d.hpp#L860).
 * 
 */
export declare class DescriptorMatcher {

  /**
   *   If the collection is not empty, the new descriptors are added to existing train descriptors.
   *   
   *   @param descriptors Descriptors to add. Each descriptors[i] is a set of descriptors from the same
   * train image.
   */
  public add(descriptors: any): any

  /**
   *   
   */
  public clear(): void

  /**
   *   
   *   @param emptyTrainData If emptyTrainData is false, the method creates a deep copy of the object,
   * that is, copies both parameters and train data. If emptyTrainData is true, the method creates an
   * object copy with the current parameters but with empty train data.
   */
  public clone(emptyTrainData?: bool): any

  /**
   *   
   */
  public empty(): bool

  /**
   *   
   */
  public getTrainDescriptors(): any

  /**
   *   
   */
  public isMaskSupported(): bool

  /**
   *   These extended variants of
   * [DescriptorMatcher::match](#db/d39/classcv_1_1DescriptorMatcher_1a0f046f47b68ec7074391e1e85c750cba})
   *  methods find several best matches for each query descriptor. The matches are returned in the
   * distance increasing order. See
   * [DescriptorMatcher::match](#db/d39/classcv_1_1DescriptorMatcher_1a0f046f47b68ec7074391e1e85c750cba})
   *  for the details about query and train descriptors.
   *   
   *   @param queryDescriptors Query set of descriptors.
   *   @param trainDescriptors Train set of descriptors. This set is not added to the train descriptors
   * collection stored in the class object.
   *   @param matches Matches. Each matches[i] is k or less matches for the same query descriptor.
   *   @param k Count of best matches found per each query descriptor or less if a query descriptor has
   * less than k possible matches in total.
   *   @param mask Mask specifying permissible matches between an input query and train matrices of
   * descriptors.
   *   @param compactResult Parameter used when the mask (or masks) is not empty. If compactResult is
   * false, the matches vector has the same size as queryDescriptors rows. If compactResult is true, the
   * matches vector does not contain matches for fully masked-out query descriptors.
   */
  public knnMatch(queryDescriptors: any, trainDescriptors: any, matches: any, k: int, mask?: any, compactResult?: bool): any

  /**
   *   This is an overloaded member function, provided for convenience. It differs from the above
   * function only in what argument(s) it accepts.
   *   
   *   @param queryDescriptors Query set of descriptors.
   *   @param matches Matches. Each matches[i] is k or less matches for the same query descriptor.
   *   @param k Count of best matches found per each query descriptor or less if a query descriptor has
   * less than k possible matches in total.
   *   @param masks Set of masks. Each masks[i] specifies permissible matches between the input query
   * descriptors and stored train descriptors from the i-th image trainDescCollection[i].
   *   @param compactResult Parameter used when the mask (or masks) is not empty. If compactResult is
   * false, the matches vector has the same size as queryDescriptors rows. If compactResult is true, the
   * matches vector does not contain matches for fully masked-out query descriptors.
   */
  public knnMatch(queryDescriptors: any, matches: any, k: int, masks?: any, compactResult?: bool): any

  /**
   *   In the first variant of this method, the train descriptors are passed as an input argument. In
   * the second variant of the method, train descriptors collection that was set by
   * [DescriptorMatcher::add](#db/d39/classcv_1_1DescriptorMatcher_1a623a2b07755cf7fb1c79554af73cdbb0})
   * is used. Optional mask (or masks) can be passed to specify which query and training descriptors can
   * be matched. Namely, queryDescriptors[i] can be matched with trainDescriptors[j] only if
   * mask.at<uchar>(i,j) is non-zero.
   *   
   *   @param queryDescriptors Query set of descriptors.
   *   @param trainDescriptors Train set of descriptors. This set is not added to the train descriptors
   * collection stored in the class object.
   *   @param matches Matches. If a query descriptor is masked out in mask , no match is added for this
   * descriptor. So, matches size may be smaller than the query descriptors count.
   *   @param mask Mask specifying permissible matches between an input query and train matrices of
   * descriptors.
   */
  public match(queryDescriptors: any, trainDescriptors: any, matches: any, mask?: any): any

  /**
   *   This is an overloaded member function, provided for convenience. It differs from the above
   * function only in what argument(s) it accepts.
   *   
   *   @param queryDescriptors Query set of descriptors.
   *   @param matches Matches. If a query descriptor is masked out in mask , no match is added for this
   * descriptor. So, matches size may be smaller than the query descriptors count.
   *   @param masks Set of masks. Each masks[i] specifies permissible matches between the input query
   * descriptors and stored train descriptors from the i-th image trainDescCollection[i].
   */
  public match(queryDescriptors: any, matches: any, masks?: any): any

  /**
   *   For each query descriptor, the methods find such training descriptors that the distance between
   * the query descriptor and the training descriptor is equal or smaller than maxDistance. Found
   * matches are returned in the distance increasing order.
   *   
   *   @param queryDescriptors Query set of descriptors.
   *   @param trainDescriptors Train set of descriptors. This set is not added to the train descriptors
   * collection stored in the class object.
   *   @param matches Found matches.
   *   @param maxDistance Threshold for the distance between matched descriptors. Distance means here
   * metric distance (e.g. Hamming distance), not the distance between coordinates (which is measured in
   * Pixels)!
   *   @param mask Mask specifying permissible matches between an input query and train matrices of
   * descriptors.
   *   @param compactResult Parameter used when the mask (or masks) is not empty. If compactResult is
   * false, the matches vector has the same size as queryDescriptors rows. If compactResult is true, the
   * matches vector does not contain matches for fully masked-out query descriptors.
   */
  public radiusMatch(queryDescriptors: any, trainDescriptors: any, matches: any, maxDistance: float, mask?: any, compactResult?: bool): any

  /**
   *   This is an overloaded member function, provided for convenience. It differs from the above
   * function only in what argument(s) it accepts.
   *   
   *   @param queryDescriptors Query set of descriptors.
   *   @param matches Found matches.
   *   @param maxDistance Threshold for the distance between matched descriptors. Distance means here
   * metric distance (e.g. Hamming distance), not the distance between coordinates (which is measured in
   * Pixels)!
   *   @param masks Set of masks. Each masks[i] specifies permissible matches between the input query
   * descriptors and stored train descriptors from the i-th image trainDescCollection[i].
   *   @param compactResult Parameter used when the mask (or masks) is not empty. If compactResult is
   * false, the matches vector has the same size as queryDescriptors rows. If compactResult is true, the
   * matches vector does not contain matches for fully masked-out query descriptors.
   */
  public radiusMatch(queryDescriptors: any, matches: any, maxDistance: float, masks?: any, compactResult?: bool): any

  /**
   *   
   *   @param fileName 
   */
  public read(fileName: any): any

  /**
   *   
   *   @param fn 
   */
  public read(fn: any): any

  /**
   *   Trains a descriptor matcher (for example, the flann index). In all methods to match, the method
   * [train()](#db/d39/classcv_1_1DescriptorMatcher_1a80e9fd98de5908f5348c17696eeb1a32}) is run every
   * time before matching. Some descriptor matchers (for example, BruteForceMatcher) have an empty
   * implementation of this method. Other matchers really train their inner structures (for example,
   * [FlannBasedMatcher](#dc/de2/classcv_1_1FlannBasedMatcher}) trains
   * [flann::Index](#d1/db2/classcv_1_1flann_1_1Index}) ).
   *   
   */
  public train(): void

  /**
   *   
   *   @param fileName 
   */
  public write(fileName: any): any

  /**
   *   
   *   @param fs 
   */
  public write(fs: any): any

  /**
   *   
   *   @param fs 
   *   @param name 
   */
  public write(fs: any, name?: any): any

  /**
   *   
   *   @param descriptorMatcherType Descriptor matcher type. Now the following matcher types are
   * supported:
   *   BruteForce (it uses L2 )BruteForce-L1BruteForce-HammingBruteForce-Hamming(2)FlannBased
   */
  public static create(descriptorMatcherType: any): any

  /**
   *   
   *   @param matcherType 
   */
  public static create(matcherType: any): any
}

/**
 * 
 */
export declare const FLANNBASED: MatcherType // initializer: = 1

/**
 * 
 */
export declare const BRUTEFORCE: MatcherType // initializer: = 2

/**
 * 
 */
export declare const BRUTEFORCE_L1: MatcherType // initializer: = 3

/**
 * 
 */
export declare const BRUTEFORCE_HAMMING: MatcherType // initializer: = 4

/**
 * 
 */
export declare const BRUTEFORCE_HAMMINGLUT: MatcherType // initializer: = 5

/**
 * 
 */
export declare const BRUTEFORCE_SL2: MatcherType // initializer: = 6

/**
 * 
 */
export type MatcherType = any
