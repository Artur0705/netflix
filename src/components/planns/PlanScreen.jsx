import React, { useEffect, useState } from "react";
import "./PlanScreen.css";
import { db } from "../../firebase";
import {
  collection,
  where,
  query,
  getDocs,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/counter/userSlice";
import { loadStripe } from "@stripe/stripe-js";

const PlanScreen = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const getSubscription = async () => {
      const querySnapshot = await getDocs(
        collection(db, "customers", user.uid, "subscriptions")
      );
      querySnapshot.forEach((subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end?.seconds,
          current_period_start:
            subscription.data().current_period_start?.seconds,
        });
      });
    };
    getSubscription();
  }, [user.uid]);

  useEffect(() => {
    const q = query(collection(db, "products"), where("active", "==", true));
    getDocs(q).then(async (querySnapshot) => {
      const products = {};
      await Promise.all(
        querySnapshot.docs.map(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        })
      );
      setProducts(products);
    });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occurred: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51LxjF8Bnn6UGIN8Rid8YJoDnTbiCJ90YHFPNtHS8GLtXk43y3B2zMpk7jJyWHcfsdfeiLj2m6LG9tF5rTTbffzfa00rMPpran3"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  return (
    <div className="plan-screen">
      {subscription && (
        <p className="renewal">
          Renewal date:
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plan-screen-disabled"
            } plan-screen-plan`}
          >
            <div className="plan-screen-info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData?.prices?.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlanScreen;
