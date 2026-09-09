#include <stdio.h>

int main()
{
    int a=99;
    float z =90.9999;


    char f = 'A';
    double b = a;
    float c =a;
    char d=a;
    double h= f;
    int e = f;
    int g=b;


    /*Implict type conversion in c uisng different way*/
    printf(" implict type conversion (int to double):: %f\n",b);
    printf(" implict type conversion ( double to int):: %d\n",g);
    printf(" implict type conversion (int to float):: %2f\n",c);
    printf(" implict type conversion (int to char):: %c\n",d);
    printf(" implict type conversion ( char to int):: %d\n",e);
    printf(" implict type conversion ( char to double):: %2f\n",h);


    /*Explict type conversions in c using differnet ways*/
    double x=(double)a;
    printf(" Explict type conversion ( int to double):: %f\n",x);

    float y=(float)a;
    printf(" Explict type conversion ( int to float):: %f\n",y);

    char m=(char)z;
    printf(" Explict type conversion ( float to char):: %c\n",m);

    int n =(int)m;
    printf(" Explict type conversion ( char to int):: %d\n",n);

    float o =(float)m;
    printf(" Explict type conversion ( char to float ):: %f\n",o);


    return 0;
}