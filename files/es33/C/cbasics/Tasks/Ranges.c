#include <stdio.h>
#include <limits.h>
#include <float.h>
#include <stdbool.h>

int main()
{
    printf("========== INTEGER DATA TYPES ==========\n");

    printf("signed char               : %d to %d\n", SCHAR_MIN, SCHAR_MAX);
    printf("unsigned char             : 0 to %u\n", UCHAR_MAX);

    printf("short int                 : %d to %d\n", SHRT_MIN, SHRT_MAX);
    printf("unsigned short int        : 0 to %u\n", USHRT_MAX);
 
    printf("int                       : %d to %d\n", INT_MIN, INT_MAX);
    printf("unsigned int              : 0 to %u\n", UINT_MAX);

    printf("long int                  : %ld to %ld\n", LONG_MIN, LONG_MAX);
    printf("unsigned long int         : 0 to %lu\n", ULONG_MAX);

    printf("long long int             : %lld to %lld\n", LLONG_MIN, LLONG_MAX);
    printf("unsigned long long int    : 0 to %llu\n", ULLONG_MAX);

    printf("\n========== FLOATING-POINT DATA TYPES ==========\n");

    printf("float                     : %e to %e\n", FLT_MIN, FLT_MAX);
    printf("double                    : %e to %e\n", DBL_MIN, DBL_MAX);
    printf("long double               : %Le to %Le\n", LDBL_MIN, LDBL_MAX);

    printf("\n========== BOOLEAN ==========\n");

    printf("bool                      : %d to %d\n", false, true);

    return 0;
}