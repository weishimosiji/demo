package com.example.administrator.qqzoneheader;


import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.Transformation;
import android.widget.ImageView;
import android.widget.ListView;

/**
 * Created by Administrator on 2016/11/26.
 */
public class MyListView extends ListView {
    private int startHeight;
    private ImageView imageView;

    public void setImageView(ImageView imageView) {
        this.imageView = imageView;
    }

    public MyListView(Context context, AttributeSet attrs) {
        super(context, attrs);
        startHeight = context.getResources().getDimensionPixelOffset(R.dimen.size);
    }

    @Override
    protected boolean overScrollBy(int deltaX, int deltaY, int scrollX, int scrollY, int scrollRangeX, int scrollRangeY, int maxOverScrollX, int maxOverScrollY, boolean isTouchEvent) {
        if(deltaY<0){
            imageView.getLayoutParams().height = imageView.getHeight()-deltaY;
            imageView.requestLayout();
        }else{
            if(imageView.getHeight()>startHeight) {
                imageView.getLayoutParams().height = imageView.getHeight() - deltaY;

                imageView.requestLayout();
            }

        }
        return super.overScrollBy(deltaX, deltaY, scrollX, scrollY, scrollRangeX, scrollRangeY, maxOverScrollX, maxOverScrollY, isTouchEvent);
    }

    @Override
    protected void onScrollChanged(int l, int t, int oldl, int oldt) {
        View header = (View) imageView.getParent();
        int delaty = header.getTop();
        if(delaty<0&&imageView.getHeight()>startHeight){
            imageView.getLayoutParams().height = imageView.getHeight()-delaty;
            imageView.requestLayout();
        }

        super.onScrollChanged(l, t, oldl, oldt);
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        if(ev.getAction() == MotionEvent.ACTION_UP){
            UpAnimation animation = new UpAnimation(imageView,startHeight,imageView.getLayoutParams().height);
            animation.setDuration(400);
            imageView.startAnimation(animation);
        }
        return super.onTouchEvent(ev);
    }
}

class UpAnimation extends Animation{

    private int extraHeight;
    private int nowHeight;
    private int startHeight;
    private ImageView imageView;

    public UpAnimation(ImageView imageView, int startHeight, int nowHeight) {
        this.imageView = imageView;
        this.startHeight = startHeight;
        this.nowHeight = nowHeight;
        this.extraHeight = nowHeight - startHeight;
    }

    @Override
    protected void applyTransformation(float interpolatedTime, Transformation t) {
        imageView.getLayoutParams().height = (int) (nowHeight - extraHeight*interpolatedTime);
        imageView.requestLayout();
        super.applyTransformation(interpolatedTime, t);
    }
}
