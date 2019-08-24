
import { int, InputArray, OutputArray, double, bool, InputArrayOfArrays, Size, float } from './_types'
/*
 * # imgproc_hist
 *
 * TODO  
 */

/**
 * The function [cv::calcBackProject](#d6/dc7/group__imgproc__hist_1ga3a0af640716b456c3d14af8aee12e3ca}) calculates the back project of the histogram. That is, similarly to [calcHist](#d6/dc7/group__imgproc__hist_1ga4b2b5fd75503ff9e6844cc4dcdaed35d}) , at each location (x, y) the function collects the values from the selected channels in the input images and finds the corresponding histogram bin. But instead of incrementing it, the function reads the bin value, scales it by scale , and stores in backProject(x,y) . In terms of statistics, the function computes probability of each element value in respect with the empirical probability distribution represented by the histogram. See how, for example, you can find and track a bright-colored object in a scene:
 * 
 * Before tracking, show the object to the camera so that it covers almost the whole frame. Calculate a hue histogram. The histogram may have strong maximums, corresponding to the dominant colors in the object.
 * When tracking, calculate a back projection of a hue plane of each input video frame using that pre-computed histogram. Threshold the back projection to suppress weak colors. It may also make sense to suppress pixels with non-sufficient color saturation and too dark or too bright pixels.
 * Find connected components in the resulting picture and choose, for example, the largest component.
 * 
 * This is an approximate algorithm of the CamShift color object tracker.
 * 
 * [calcHist](#d6/dc7/group__imgproc__hist_1ga4b2b5fd75503ff9e6844cc4dcdaed35d}), [compareHist](#d6/dc7/group__imgproc__hist_1gaf4190090efa5c47cb367cf97a9a519bd})
 * 
 * @param images Source arrays. They all should have the same depth, CV_8U, CV_16U or CV_32F , and the same size. Each of them can have an arbitrary number of channels.
 * @param nimages Number of source images.
 * @param channels The list of channels used to compute the back projection. The number of channels must match the histogram dimensionality. The first array channels are numerated from 0 to images[0].channels()-1 , the second array channels are counted from images[0].channels() to images[0].channels() + images[1].channels()-1, and so on.
 * @param hist Input histogram that can be dense or sparse.
 * @param backProject Destination back projection array that is a single-channel array of the same size and depth as images[0] .
 * @param ranges Array of arrays of the histogram bin boundaries in each dimension. See calcHist .
 * @param scale Optional scale factor for the output back projection.
 * @param uniform Flag indicating whether the histogram is uniform or not (see above).
 */
export declare function calcBackProject(images: any, nimages: int, channels: any, hist: InputArray, backProject: OutputArray, ranges: any, scale: double, uniform: bool): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param images 
 * @param nimages 
 * @param channels 
 * @param hist 
 * @param backProject 
 * @param ranges 
 * @param scale 
 * @param uniform 
 */
export declare function calcBackProject(images: any, nimages: int, channels: any, hist: any, backProject: OutputArray, ranges: any, scale: double, uniform: bool): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param images 
 * @param channels 
 * @param hist 
 * @param dst 
 * @param ranges 
 * @param scale 
 */
export declare function calcBackProject(images: InputArrayOfArrays, channels: any, hist: InputArray, dst: OutputArray, ranges: any, scale: double): void

/**
 * The function [cv::calcHist](#d6/dc7/group__imgproc__hist_1ga4b2b5fd75503ff9e6844cc4dcdaed35d}) calculates the histogram of one or more arrays. The elements of a tuple used to increment a histogram bin are taken from the corresponding input arrays at the same location. The sample below shows how to compute a 2D Hue-Saturation histogram for a color image. : 
 * 
 * ```cpp
 * #include <[opencv2/imgproc.hpp](#d1/d4f/imgproc_2include_2opencv2_2imgproc_8hpp})>
 * #include <[opencv2/highgui.hpp](#d4/dd5/highgui_8hpp})>
 * 
 * using namespace [cv](#d2/d75/namespacecv});
 * 
 * int main( int argc, char** argv )
 * {
 *     [Mat](#d3/d63/classcv_1_1Mat}) src, hsv;
 *     if( argc != 2 || !(src=[imread](#d4/da8/group__imgcodecs_1ga288b8b3da0892bd651fce07b3bbd3a56})(argv[1], 1)).data )
 *         return -1;
 * 
 *     [cvtColor](#d8/d01/group__imgproc__color__conversions_1ga397ae87e1288a81d2363b61574eb8cab})(src, hsv, [COLOR_BGR2HSV](#d8/d01/group__imgproc__color__conversions_1gga4e0972be5de079fed4e3a10e24ef5ef0aa4a7f0ecf2e94150699e48c79139ee12}));
 * 
 *     // Quantize the hue to 30 levels
 *     // and the saturation to 32 levels
 *     int hbins = 30, sbins = 32;
 *     int histSize[] = {hbins, sbins};
 *     // hue varies from 0 to 179, see cvtColor
 *     float hranges[] = { 0, 180 };
 *     // saturation varies from 0 (black-gray-white) to
 *     // 255 (pure spectrum color)
 *     float sranges[] = { 0, 256 };
 *     const float* ranges[] = { hranges, sranges };
 *     MatND hist;
 *     // we compute the histogram from the 0-th and 1-st channels
 *     int channels[] = {0, 1};
 * 
 *     [calcHist](#d6/dc7/group__imgproc__hist_1ga4b2b5fd75503ff9e6844cc4dcdaed35d})( &hsv, 1, channels, [Mat](#d3/d63/classcv_1_1Mat})(), // do not use mask
 *              hist, 2, histSize, ranges,
 *              true, // the histogram is uniform
 *              false );
 *     double maxVal=0;
 *     [minMaxLoc](#d2/de8/group__core__array_1gab473bf2eb6d14ff97e89b355dac20707})(hist, 0, &maxVal, 0, 0);
 * 
 *     int scale = 10;
 *     [Mat](#d3/d63/classcv_1_1Mat}) histImg = [Mat::zeros](#d3/d63/classcv_1_1Mat_1a0b57b6a326c8876d944d188a46e0f556})(sbins*scale, hbins*10, [CV_8UC3](#d1/d1b/group__core__hal__interface_1ga88c4cd9de76f678f33928ef1e3f96047}));
 * 
 *     for( int h = 0; h < hbins; h++ )
 *         for( int s = 0; s < sbins; s++ )
 *         {
 *             float binVal = hist.at<float>(h, s);
 *             int intensity = [cvRound](#db/de0/group__core__utils_1ga085eca238176984a0b72df2818598d85})(binVal*255/maxVal);
 *             [rectangle](#d6/d6e/group__imgproc__draw_1ga07d2f74cadcf8e305e810ce8eed13bc9})( histImg, [Point](#dc/d84/group__core__basic_1ga1e83eafb2d26b3c93f09e8338bcab192})(h*scale, s*scale),
 *                         [Point](#dc/d84/group__core__basic_1ga1e83eafb2d26b3c93f09e8338bcab192})( (h+1)*scale - 1, (s+1)*scale - 1),
 *                         [Scalar::all](#d1/da0/classcv_1_1Scalar___1ac1509a4b8454fe7fe29db069e13a2e6f})(intensity),
 *                         -1 );
 *         }
 * 
 *     [namedWindow](#d7/dfc/group__highgui_1ga5afdf8410934fd099df85c75b2e0888b})( "Source", 1 );
 *     [imshow](#d7/dfc/group__highgui_1ga453d42fe4cb60e5723281a89973ee563})( "Source", src );
 * 
 *     [namedWindow](#d7/dfc/group__highgui_1ga5afdf8410934fd099df85c75b2e0888b})( "H-S Histogram", 1 );
 *     [imshow](#d7/dfc/group__highgui_1ga453d42fe4cb60e5723281a89973ee563})( "H-S Histogram", histImg );
 *     [waitKey](#d7/dfc/group__highgui_1ga5628525ad33f52eab17feebcfba38bd7})();
 * }
 * ```
 * 
 * @param images Source arrays. They all should have the same depth, CV_8U, CV_16U or CV_32F , and the same size. Each of them can have an arbitrary number of channels.
 * @param nimages Number of source images.
 * @param channels List of the dims channels used to compute the histogram. The first array channels are numerated from 0 to images[0].channels()-1 , the second array channels are counted from images[0].channels() to images[0].channels() + images[1].channels()-1, and so on.
 * @param mask Optional mask. If the matrix is not empty, it must be an 8-bit array of the same size as images[i] . The non-zero mask elements mark the array elements counted in the histogram.
 * @param hist Output histogram, which is a dense or sparse dims -dimensional array.
 * @param dims Histogram dimensionality that must be positive and not greater than CV_MAX_DIMS (equal to 32 in the current OpenCV version).
 * @param histSize Array of histogram sizes in each dimension.
 * @param ranges Array of the dims arrays of the histogram bin boundaries in each dimension. When the histogram is uniform ( uniform =true), then for each dimension i it is enough to specify the lower (inclusive) boundary $L_0$ of the 0-th histogram bin and the upper (exclusive) boundary $U_{\texttt{histSize}[i]-1}$ for the last histogram bin histSize[i]-1 . That is, in case of a uniform histogram each of ranges[i] is an array of 2 elements. When the histogram is not uniform ( uniform=false ), then each of ranges[i] contains histSize[i]+1 elements: $L_0, U_0=L_1, U_1=L_2, ..., U_{\texttt{histSize[i]}-2}=L_{\texttt{histSize[i]}-1}, U_{\texttt{histSize[i]}-1}$ . The array elements, that are not between $L_0$ and $U_{\texttt{histSize[i]}-1}$ , are not counted in the histogram.
 * @param uniform Flag indicating whether the histogram is uniform or not (see above).
 * @param accumulate Accumulation flag. If it is set, the histogram is not cleared in the beginning when it is allocated. This feature enables you to compute a single histogram from several sets of arrays, or to update the histogram in time.
 */
export declare function calcHist(images: any, nimages: int, channels: any, mask: InputArray, hist: OutputArray, dims: int, histSize: any, ranges: any, uniform: bool, accumulate: bool): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * this variant uses SparseMat for output
 * 
 * @param images 
 * @param nimages 
 * @param channels 
 * @param mask 
 * @param hist 
 * @param dims 
 * @param histSize 
 * @param ranges 
 * @param uniform 
 * @param accumulate 
 */
export declare function calcHist(images: any, nimages: int, channels: any, mask: InputArray, hist: any, dims: int, histSize: any, ranges: any, uniform: bool, accumulate: bool): void

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param images 
 * @param channels 
 * @param mask 
 * @param hist 
 * @param histSize 
 * @param ranges 
 * @param accumulate 
 */
export declare function calcHist(images: InputArrayOfArrays, channels: any, mask: InputArray, hist: OutputArray, histSize: any, ranges: any, accumulate: bool): void

/**
 * The function [cv::compareHist](#d6/dc7/group__imgproc__hist_1gaf4190090efa5c47cb367cf97a9a519bd}) compares two dense or two sparse histograms using the specified method.
 * 
 * The function returns `$d(H_1, H_2)$` .
 * 
 * While the function works well with 1-, 2-, 3-dimensional dense histograms, it may not be suitable for high-dimensional sparse histograms. In such histograms, because of aliasing and sampling problems, the coordinates of non-zero histogram bins can slightly shift. To compare such histograms or more general sparse configurations of weighted points, consider using the [EMD](#d6/dc7/group__imgproc__hist_1ga902b8e60cc7075c8947345489221e0e0}) function.
 * 
 * @param H1 First compared histogram.
 * @param H2 Second compared histogram of the same size as H1 .
 * @param method Comparison method, see HistCompMethods
 */
export declare function compareHist(H1: InputArray, H2: InputArray, method: int): double

/**
 * This is an overloaded member function, provided for convenience. It differs from the above function only in what argument(s) it accepts.
 * 
 * @param H1 
 * @param H2 
 * @param method 
 */
export declare function compareHist(H1: any, H2: any, method: int): double

/**
 * 
 * @param clipLimit Threshold for contrast limiting.
 * @param tileGridSize Size of grid for histogram equalization. Input image will be divided into equally sized rectangular tiles. tileGridSize defines the number of tiles in row and column.
 */
export declare function createCLAHE(clipLimit: double, tileGridSize: Size): any

/**
 * The function computes the earth mover distance and/or a lower boundary of the distance between the two weighted point configurations. One of the applications described in RubnerSept98, Rubner2000 is multi-dimensional histogram comparison for image retrieval. EMD is a transportation problem that is solved using some modification of a simplex algorithm, thus the complexity is exponential in the worst case, though, on average it is much faster. In the case of a real metric the lower boundary can be calculated even faster (using linear-time algorithm) and it can be used to determine roughly whether the two signatures are far enough so that they cannot relate to the same object.
 * 
 * @param signature1 First signature, a $\texttt{size1}\times \texttt{dims}+1$ floating-point matrix. Each row stores the point weight followed by the point coordinates. The matrix is allowed to have a single column (weights only) if the user-defined cost matrix is used. The weights must be non-negative and have at least one non-zero value.
 * @param signature2 Second signature of the same format as signature1 , though the number of rows may be different. The total weights may be different. In this case an extra "dummy" point is added to either signature1 or signature2. The weights must be non-negative and have at least one non-zero value.
 * @param distType Used metric. See DistanceTypes.
 * @param cost User-defined $\texttt{size1}\times \texttt{size2}$ cost matrix. Also, if a cost matrix is used, lower boundary lowerBound cannot be calculated because it needs a metric function.
 * @param lowerBound Optional input/output parameter: lower boundary of a distance between the two signatures that is a distance between mass centers. The lower boundary may not be calculated if the user-defined cost matrix is used, the total weights of point configurations are not equal, or if the signatures consist of weights only (the signature matrices have a single column). You must** initialize *lowerBound . If the calculated distance between mass centers is greater or equal to *lowerBound (it means that the signatures are far enough), the function does not calculate EMD. In any case *lowerBound is set to the calculated distance between mass centers on return. Thus, if you want to calculate both distance between mass centers and EMD, *lowerBound should be set to 0.
 * @param flow Resultant $\texttt{size1} \times \texttt{size2}$ flow matrix: $\texttt{flow}_{i,j}$ is a flow from $i$ -th point of signature1 to $j$ -th point of signature2 .
 */
export declare function EMD(signature1: InputArray, signature2: InputArray, distType: int, cost: InputArray, lowerBound: any, flow: OutputArray): float

/**
 * The function equalizes the histogram of the input image using the following algorithm:
 * 
 * Calculate the histogram `$H$` for src .
 * Normalize the histogram so that the sum of histogram bins is 255.
 * Compute the integral of the histogram: `\\[H'_i = \\sum _{0 \\le j < i} H(j)\\]`
 * Transform the image using `$H'$` as a look-up table: `$\\texttt{dst}(x,y) = H'(\\texttt{src}(x,y))$`
 * 
 * The algorithm normalizes the brightness and increases the contrast of the image.
 * 
 * @param src Source 8-bit single channel image.
 * @param dst Destination image of the same size and type as src .
 */
export declare function equalizeHist(src: InputArray, dst: OutputArray): void

/**
 * 
 * @param signature1 
 * @param signature2 
 * @param distType 
 * @param cost 
 * @param lowerBound 
 * @param flow 
 */
export declare function wrapperEMD(signature1: InputArray, signature2: InputArray, distType: int, cost: InputArray, lowerBound: any, flow: OutputArray): float

